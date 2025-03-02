import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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
import EventDetailModal from './components/Calendar/EventDetailModal';
import { styles } from './App.styles';

const localizer = momentLocalizer(moment);

function App() {
  const [selectedPage, setSelectedPage] = useState('updates');
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { getCalendarEvents } = useCommitteeAgendaStore();
  useFetchMeasureInfoFromApi();

  const [open, setOpen] = useState(false);
  const [currentMeasureId, setCurrentMeasureId] = useState<string | undefined>(
    undefined
  );
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const handleOpen = (event: any) => {
    setCurrentEvent(event);
    setCurrentMeasureId(event.id);
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
                style={{ height: 500, width: 800 }}
                onSelectEvent={(event) => {
                  handleOpen(event);
                }}
                eventPropGetter={(event) => {
                  const backgroundColor = event.color || 'green'; // Default color
                  return {
                    style: {
                      backgroundColor,
                      color: 'white',
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
        <EventDetailModal
          open={open}
          handleClose={handleClose}
          measureId={currentMeasureId}
          event={currentEvent}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
