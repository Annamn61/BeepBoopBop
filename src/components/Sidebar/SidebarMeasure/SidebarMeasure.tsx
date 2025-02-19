import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../types/MeasureTypes';
import useMeasureStore from '../../../store/MeasureStore';
import { styles } from './SidebarMeasure.styles'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SidebarMeasureProps {
    userTrackedMeasure: UserTrackedMeasure;
}

const SidebarMeasure = ({userTrackedMeasure} : SidebarMeasureProps) => {
    const { getMeasureTitleById, setUserTrackedMeasureFilterStatusById, getUserMeasureColorById} = useMeasureStore();
    
  const {isDisplayed, id } = userTrackedMeasure;
          const title = getMeasureTitleById(id);
          const measureColor = getUserMeasureColorById(id);

          const checkboxStyles = {
            backgroundColor: isDisplayed ? measureColor: 'transparent',
            borderColor: measureColor
          }

          return (
            <Box sx={styles.measureFilter} onClick={() => console.log('toggle all others on or off')}>
                <Button sx={{...styles.checkbox, ...checkboxStyles}} onClick={() => setUserTrackedMeasureFilterStatusById(id, !isDisplayed)} />
                <Box sx={styles.infoArea} className="sidebar-measure-filter-data">
                  <Typography sx={styles.measureId} className="sidebar-measure-filter-billid">{id}</Typography>
                  <Typography>{title}</Typography>
                </Box>
            </Box>
          )
};

export default SidebarMeasure;