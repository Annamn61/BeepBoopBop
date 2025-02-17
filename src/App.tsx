import moment from 'moment'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './App.css'
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard'
import { Sidebar } from './components/Sidebar/Sidebar'
import { SimpleAuth } from './components/SimpleAuth/SimpleAuth'
import { useSimpleAuth } from './components/SimpleAuth/SimpleAuth.helpers'
import useHistoryStore from './store/HistoryStore'
import useMeasureStore from './store/MeasureStore'
import useCommitteeAgendaStore from './store/CommitteeAgendaStore';
import { fetchCommitteeAgendaItems, fetchMeasureHistoryActions, fetchMeasures } from './utils/ODataRquests'
import { MeasureHistory } from './components/MeasureHistory/MeasureHistory'
import TitleLogo from './components/TitleLogo/TitleLogo'
import Box from '@mui/material/Box'
import PageTabs from './components/PageTabs/PageTabs'
import { Modal } from '@mui/material'

const localizer = momentLocalizer(moment)

function App() {
  const { setUnfilteredMeasures } = useMeasureStore();
  const { setUnfilteredHistory } = useHistoryStore();
  const { setUnfilteredCommitteeAgenda, getCalendarEvents } = useCommitteeAgendaStore();
  const { isLoggedIn, checkPassword} = useSimpleAuth();
  const [selectedPage, setSelectedPage] = useState('location');

  // Modal States
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetchMeasures().then((response) => {
      setUnfilteredMeasures(response)
    });
    fetchMeasureHistoryActions().then((response)=> {
      setUnfilteredHistory(response);
    });
    fetchCommitteeAgendaItems().then((response) => {
      setUnfilteredCommitteeAgenda(response);
    })
  }, []);

  console.log(getCalendarEvents())

  return (
    isLoggedIn ? (
      <div className="app-container">
        <Sidebar />
        <Box sx={{
          overflow: 'hidden',
          paddingTop: 4,
          paddingBottom: 4,
        }}>
          <Box sx={{
              paddingLeft: 12, 
              paddingRight: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
          }}>
          <TitleLogo />
          <PageTabs selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

          {selectedPage === 'history' && <MeasureHistory />}
          {selectedPage === 'calendar' && 
            <Calendar
              localizer={localizer}
              events={getCalendarEvents()}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: 800 }}
              onSelectEvent={(event) => {
              //   window.alert(`
              //     Title: ${event.title} \n
              //     Measure: ${event.measureNumber} \n
              //     Comments: ${event.comments} \n
              //   `);
              // }}
              handleOpen()}}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            HEY
          </Box>
        </Modal>
      </div>
      ): <SimpleAuth checkPassword={checkPassword} />
  )
}

export default App
