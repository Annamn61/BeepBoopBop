import './App.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { BillLocationBoard } from './components/BillLocationBoard/BillLocationBoard'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
import { fetchMeasures } from './utils/ODataRquests';

function App() {
  const [count, setCount] = useState(0);

  fetchMeasures();

  return (
      <div>
        <BillLocationBoard />
        
        <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, width: 800 }}
    />
      </div>
  )
}

export default App
