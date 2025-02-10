import './App.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
import { fetchMeasures } from './utils/ODataRquests';
import useBillStore from './store/MeasureStore'
import { useEffect } from 'react'

function App() {
  const { setMeasures } = useBillStore();

  useEffect(() => {
    fetchMeasures().then((response) => {
      setMeasures(response)
    });
  }, [])

  return (
      <div className="app-container">
        <div className="sidebar"> SIDEBAR</div>
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
