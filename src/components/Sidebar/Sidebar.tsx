import useMeasureStore from "../../store/MeasureStore";
import './Sidebar.css'
import Typography from '@mui/material/Typography';
import { AddTrackedBill } from "./AddTrackedBill/AddTrackedBill";
import SidebarMeasure from './SidebarMeasure/SidebarMeasure'

export const Sidebar = () => {
    const { userTrackedMeasures } = useMeasureStore();

    return(
        <div className="sidebar">
            <div className="sidebar-section">
            <div className="section-header">
                <Typography>Tracked Bills</Typography>
            
                <AddTrackedBill />

            </div>

            {userTrackedMeasures.map((userTrackedMeasure) => (
              <SidebarMeasure userTrackedMeasure={userTrackedMeasure} />
            ))}
            </div>
      </div>
    )
}