import './App.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
import { fetchMeasures, fetchCommitteeAgendaItems, fetchMeasureHistoryActions } from './utils/ODataRquests';
import useBillStore from './store/MeasureStore'
import { useEffect } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'
import { useSimpleAuth } from './components/SimpleAuth/SimpleAuth.helpers'
import { SimpleAuth } from './components/SimpleAuth/SimpleAuth'
import useHistoryStore from './store/HistoryStore'
import MeasureHistory from './components/MeasureHistory/MeasureHistory'

function App() {
  const { setUnfilteredMeasures } = useBillStore();
  const { setUnfilteredHistory } = useHistoryStore();
  const { isLoggedIn, checkPassword} = useSimpleAuth();
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
        <div className="content">

        <MeasureHistory />

        <BillLocationBoard />
        
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: 800 }}
        />
        </div>
      </div>
      ): <SimpleAuth checkPassword={checkPassword} />
  )
}

export default App
