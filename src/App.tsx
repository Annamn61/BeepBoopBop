import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SimpleAuth } from './components/SimpleAuth/SimpleAuth';
import { useSimpleAuth } from './components/SimpleAuth/SimpleAuth.helpers';
import useCommitteeAgendaStore from './store/CommitteeAgendaStore';
import { useFetchMeasureInfoFromApi } from './utils/ODataRquests';
import { MeasureHistory } from './components/MeasureHistory/MeasureHistory';
import TitleLogo from './components/TitleLogo/TitleLogo';
import Box from '@mui/material/Box';
import PageTabs from './components/PageTabs/PageTabs';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './utils/theme';
import EventDetailModal from './components/Calendar/EventDetailModal'

const localizer = momentLocalizer(moment);

function App() {
  const { getCalendarEvents } = useCommitteeAgendaStore();
  const { isLoggedIn, checkPassword } = useSimpleAuth();
  const [selectedPage, setSelectedPage] = useState('location');

  // Modal States
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useFetchMeasureInfoFromApi();

  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn ? (
        <div className="app-container">
          <Sidebar />
          <Box
            sx={{
              overflow: 'hidden',
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <Box
              sx={{
                paddingLeft: 12,
                paddingRight: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <TitleLogo />
              <PageTabs
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />

          {selectedPage === 'history' && <MeasureHistory />}
          {selectedPage === 'calendar' && 
            <Calendar
              localizer={localizer}
              events={getCalendarEvents()}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: 800 }}
              onSelectEvent={(event) => {handleOpen()}}
              eventPropGetter={(event) => {
                const backgroundColor = event.color || "green"; // Default color
                return {
                  style: {
                    backgroundColor,
                    color: "white",
                    borderRadius: "4px",
                    padding: "5px",
                  },
                };
              }}
            />
          }
                </Box>

                  {selectedPage === 'location' && <BillLocationBoard />}

        </Box>
        <EventDetailModal open={open} handleClose={handleClose}/>
      </div>
      ): <SimpleAuth checkPassword={checkPassword} />
    }
    </ThemeProvider>
  )
}

export default App;
