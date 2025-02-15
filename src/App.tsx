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
import useBillStore from './store/MeasureStore'
import { fetchCommitteeAgendaItems, fetchMeasureHistoryActions, fetchMeasures } from './utils/ODataRquests'
import { MeasureHistory } from './components/MeasureHistory/MeasureHistory'
import TitleLogo from './components/TitleLogo/TitleLogo'
import Box from '@mui/material/Box'
import PageTabs from './components/PageTabs/PageTabs'

const localizer = momentLocalizer(moment)

function App() {
  const { setUnfilteredMeasures } = useBillStore();
  const { setUnfilteredHistory } = useHistoryStore();
  const { isLoggedIn, checkPassword} = useSimpleAuth();
  const [selectedPage, setSelectedPage] = useState('location')
  fetchCommitteeAgendaItems()

  useEffect(() => {
    fetchMeasures().then((response) => {
      setUnfilteredMeasures(response)
    });
    fetchMeasureHistoryActions().then((response)=> {
      setUnfilteredHistory(response);
    });
  }, [])

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
          {selectedPage === 'calendar' && <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 800 }}
        />}
                </Box>

                  {selectedPage === 'location' && <BillLocationBoard />}

        </Box>
      </div>
      ): <SimpleAuth checkPassword={checkPassword} />
  )
}

export default App
