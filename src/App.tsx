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
  const { setUnfilteredMeasures, userTrackedMeasures, getMeasureTitleById, setUserTrackedMeasureFilterStatusById} = useBillStore();


  useEffect(() => {
    fetchMeasures().then((response) => {
      setUnfilteredMeasures(response)
    });
  }, [])

  return (
      <div className="app-container">
        <div className="sidebar">
          TrackedBills
          {userTrackedMeasures.map((measure) => {
            const {isDisplayed, id } = measure;
            const title = getMeasureTitleById(id);
            return (
              <div className="sidebar-measure-filter">
                  <button className={`checkbox${isDisplayed ? '-active': ''}`} onClick={() => setUserTrackedMeasureFilterStatusById(id, !isDisplayed)} />
                  <div className="sidebar-measure-filter-data">
                    <div>{id}</div>
                    <div>{title}</div>
                  </div>
              </div>
            )
          })}
        </div>
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
