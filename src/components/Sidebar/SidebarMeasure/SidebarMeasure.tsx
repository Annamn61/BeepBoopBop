import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../types/MeasureTypes';
import useMeasureStore from '../../../store/MeasureStore';
import { styles } from './SidebarMeasure.styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmationModal from '../../Accessories/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../../utils/modal';
import Tooltip from '@mui/material/Tooltip';

interface SidebarMeasureProps {
  userTrackedMeasure: UserTrackedMeasure;
}

const SidebarMeasure = ({ userTrackedMeasure }: SidebarMeasureProps) => {
  const { anchorEl, setModalClosed, setModalOpen } = useModal();
  const {
    getMeasureTitleById,
    setUserTrackedMeasureFilterStatusById,
    getUserMeasureColorById,
    toggleAllUserTrackedFilterStatusesBasedOnAnId,
    removeTrackedMeasureById,
  } = useMeasureStore();

  const { isDisplayed, id } = userTrackedMeasure;
  const title = getMeasureTitleById(id);
  const measureColor = getUserMeasureColorById(id);

  const checkboxStyles = {
    backgroundColor: isDisplayed ? measureColor : 'transparent',
    borderColor: measureColor,
  };

  return (
    <>
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
            <Tooltip title="Remove bill from tracking">
              <IconButton
                id="deleteIcon"
                sx={styles.deleteIcon}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(e);
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1">{title}</Typography>
        </Box>
      </Box>
      <ConfirmationModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        handleAction={() => removeTrackedMeasureById(id)}
        message={`Delete ${id}?`}
        subtitle="Are you sure you want to remove this measure from your tracked measures? This action cannot be undone."
      />
    </>
  );
};

export default SidebarMeasure;
