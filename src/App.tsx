import Box from '@mui/material/Box';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import { styles } from './App.styles';
import CommiteeMeetingModal from './components/Accessories/CommiteeMeetingModal/CommiteeMeetingModal';
import { SnackbarProvider } from './components/Accessories/Snackbar/Snackbar';
import { BillLocationBoard } from './components/Pages/BillLocationBoard/BillLocationBoard';
import { MeasureHistory } from './components/Pages/MeasureHistory/MeasureHistory';
import PageTabs from './components/Things/PageTabs/PageTabs';
import { Sidebar } from './components/Things/Sidebar/Sidebar';
import useCommitteeAgendaStore from './store/CommitteeAgendaStore';
import {
  useFetchMeasureInfoFromApi,
  useGetUserTrackedMeasures,
} from './utils/ODataRquests';
import theme from './utils/theme';
import { Typography } from '@mui/material';
import Header from './components/Things/Header/Header';

const localizer = momentLocalizer(moment);

function App() {
  const [selectedPage, setSelectedPage] = useState('updates');
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { getCalendarEvents } = useCommitteeAgendaStore();
  useFetchMeasureInfoFromApi();
  useGetUserTrackedMeasures();

  const [open, setOpen] = useState(false);

  const [meetingId, setMeetingId] = useState<string | undefined>(undefined);
  const handleOpen = (event: any) => {
    setMeetingId(event.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //   console.log('currentUser', currentUser);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider />
      <div className="app-container">
        <Sidebar open={sidebarIsOpen} setOpen={setSidebarIsOpen} />
        <Box
          sx={{
            ...styles.contentContainer,
            paddingLeft: sidebarIsOpen ? '348px' : '0px',
          }}
        >
          <Box
            sx={{
              ...styles.regularPageContainers,
              paddingLeft: {
                xs: 2,
                md: sidebarIsOpen ? 6 : 12,
              },
            }}
          >
            <Header />
            <PageTabs
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            {selectedPage === 'updates' && <MeasureHistory />}
            {selectedPage === 'calendar' && (
              <>
                <Typography>
                  The calendar currently shows the committe meetings with a
                  public hearing or work session about bills you're tracking
                </Typography>
                <Calendar
                  localizer={localizer}
                  events={getCalendarEvents()}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600, width: '1100px' }}
                  onSelectEvent={(event) => {
                    handleOpen(event);
                  }}
                  defaultView="week"
                  step={15}
                  timeslots={4}
                  min={moment('7 am', 'h a').toDate()}
                  max={moment('6 pm', 'h a').toDate()}
                  eventPropGetter={(event) => {
                    const backgroundColor = event.color || 'green'; // Default color
                    return {
                      style: {
                        backgroundColor,
                        color: 'black',
                        borderRadius: '4px',
                        padding: '5px',
                      },
                    };
                  }}
                />
              </>
            )}
          </Box>

          {selectedPage === 'location' && (
            <BillLocationBoard sidebarIsOpen={sidebarIsOpen} />
          )}
        </Box>
        {meetingId && (
          <CommiteeMeetingModal
            open={open}
            onClose={handleClose}
            committeeMeetingId={meetingId}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
