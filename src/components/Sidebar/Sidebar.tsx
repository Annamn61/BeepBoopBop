import useBillStore from "../../store/MeasureStore";
import './Sidebar.css'
import Typography from '@mui/material/Typography';
import { AddTrackedBill } from "./AddTrackedBill/AddTrackedBill";

export const Sidebar = () => {
    const { userTrackedMeasures, getMeasureTitleById, setUserTrackedMeasureFilterStatusById} = useBillStore();

    return(
        <div className="sidebar">
            <div className="sidebar-section">
            <div className="section-header">
                <Typography>Tracked Bills</Typography>
            
                <AddTrackedBill />

            </div>

            {userTrackedMeasures.map((measure) => {
          const {isDisplayed, id } = measure;
          const title = getMeasureTitleById(id);
          return (
            <div className="sidebar-measure-filter">
                <button className={`checkbox${isDisplayed ? '-active': ''}`} onClick={() => setUserTrackedMeasureFilterStatusById(id, !isDisplayed)} />
                <div className="sidebar-measure-filter-data">
                  <div className="sidebar-measure-filter-billid">{id}</div>
                  <div>{title}</div>
                </div>
            </div>
          )
        })}
            </div>


        
      </div>
    )
}