import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../types/MeasureTypes';
import useMeasureStore from '../../../store/MeasureStore';
import { styles } from './SidebarMeasure.styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface SidebarMeasureProps {
  userTrackedMeasure: UserTrackedMeasure;
}

const SidebarMeasure = ({ userTrackedMeasure }: SidebarMeasureProps) => {
  const {
    getMeasureTitleById,
    setUserTrackedMeasureFilterStatusById,
    getUserMeasureColorById,
    toggleAllUserTrackedFilterStatusesBasedOnAnId,
  } = useMeasureStore();

  const { isDisplayed, id } = userTrackedMeasure;
  const title = getMeasureTitleById(id);
  const measureColor = getUserMeasureColorById(id);

  const checkboxStyles = {
    backgroundColor: isDisplayed ? measureColor : 'transparent',
    borderColor: measureColor,
  };

  return (
    <Box
      sx={styles.measureFilterContainer}
      onClick={() => toggleAllUserTrackedFilterStatusesBasedOnAnId(id)}
      role="button"
    >
      <Button
        sx={{ ...styles.checkbox, ...checkboxStyles }}
        onClick={(e) => {
          e.stopPropagation();
          setUserTrackedMeasureFilterStatusById(id, !isDisplayed);
        }}
      />
      <Box sx={styles.infoArea} className="sidebar-measure-filter-data">
        <Typography
          sx={styles.measureId}
          className="sidebar-measure-filter-billid"
        >
          {id}
        </Typography>
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
};

export default SidebarMeasure;
