import moment from 'moment';
import { useState } from 'react';
import { Calendar, WorkWeek, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard';
import { SnackbarProvider } from './components/Accessories/Snackbar/Snackbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import useCommitteeAgendaStore from './store/CommitteeAgendaStore';
import { useFetchMeasureInfoFromApi } from './utils/ODataRquests';
import { MeasureHistory } from './components/MeasureHistory/MeasureHistory';
import TitleLogo from './components/Accessories/TitleLogo/TitleLogo';
import Box from '@mui/material/Box';
import PageTabs from './components/PageTabs/PageTabs';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './utils/theme';
import { styles } from './App.styles';
import CommiteeMeetingModal from './components/Accessories/CommiteeMeetingModal/CommiteeMeetingModal';

const localizer = momentLocalizer(moment);

function App() {
  const [selectedPage, setSelectedPage] = useState('updates');
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { getCalendarEvents } = useCommitteeAgendaStore();
  useFetchMeasureInfoFromApi();

  const [open, setOpen] = useState(false);

  const [meetingId, setMeetingId] = useState<string | undefined>(undefined);
  const handleOpen = (event: any) => {
    setMeetingId(event.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
            <TitleLogo />
            <PageTabs
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            {selectedPage === 'updates' && <MeasureHistory />}
            {selectedPage === 'calendar' && (
              <Calendar
                localizer={localizer}
                events={getCalendarEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, width: '1400px' }}
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
