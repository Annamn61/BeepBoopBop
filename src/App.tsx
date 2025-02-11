import './App.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
import { fetchCommitteeMeetings, fetchMeasures, fetchCommitteeAgendaItems } from './utils/ODataRquests';
import useBillStore from './store/MeasureStore'
import { useEffect } from 'react'
import { Sidebar } from './components/Sidebar/Sidebar'

function App() {
  const { setUnfilteredMeasures } = useBillStore();
  fetchCommitteeAgendaItems()
  // fetchCommitteeMeetings();


  useEffect(() => {
    fetchMeasures().then((response) => {
      setUnfilteredMeasures(response)
    });
  }, [])

  return (
      <div className="app-container">
        <Sidebar />
        <div className="content">
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
  )
}

export default App
