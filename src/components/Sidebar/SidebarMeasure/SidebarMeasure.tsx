import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../types/MeasureTypes';
import useMeasureStore from '../../../store/MeasureStore';
import { styles } from './SidebarMeasure.styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
      <Box sx={styles.infoArea}>
        <Box sx={styles.infoTopline}>
          <Typography variant="h5" sx={styles.measureId}>
            {id}
          </Typography>
          <IconButton
            id="moreIcon"
            sx={styles.moreIcon}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">{title}</Typography>
      </Box>
    </Box>
  );
};

export default SidebarMeasure;
