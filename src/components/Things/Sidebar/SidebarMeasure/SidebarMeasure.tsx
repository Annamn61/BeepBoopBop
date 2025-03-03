import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../../types/MeasureTypes';
import useMeasureStore from '../../../../store/MeasureStore';
import { styles } from './SidebarMeasure.styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmationModal from '../../../Accessories/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../../../utils/modal';
import Tooltip from '@mui/material/Tooltip';
import MeasureModal from '../../../Accessories/MeasureModal/MeasureModal';
import { TOOLTIP_MESSAGES } from '../../../../utils/constants';
import ColorSquare from '../../../Accessories/ColorSquare/ColorSquare';

interface SidebarMeasureProps {
  userTrackedMeasure: UserTrackedMeasure;
}

const SidebarMeasure = ({ userTrackedMeasure }: SidebarMeasureProps) => {
  const { anchorEl, setModalClosed, setModalOpen } = useModal();
  const {
    anchorEl: measureAnchorEl,
    setModalClosed: closeMeasureModal,
    setModalOpen: openMeasureModal,
  } = useModal();
  const {
    setUserTrackedMeasureFilterStatusById,
    getUserMeasureColorById,
    removeTrackedMeasureById,
    getMeasureNicknameById,
  } = useMeasureStore();

  const { isDisplayed, id } = userTrackedMeasure;
  const title = getMeasureNicknameById(id);
  const measureColor = getUserMeasureColorById(id);

  return (
    <>
      <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
        <Box
          sx={styles.measureFilterContainer}
          onClick={(e) => openMeasureModal(e)}
          role="button"
        >
          <Tooltip title={TOOLTIP_MESSAGES.ToggleVisibility}>
            <Button
              sx={{ ...styles.checkbox }}
              onClick={(e) => {
                e.stopPropagation();
                setUserTrackedMeasureFilterStatusById(id, !isDisplayed);
              }}
            >
              <ColorSquare color={measureColor} filled={isDisplayed} />
            </Button>
          </Tooltip>
          <Box sx={styles.infoArea}>
            <Box sx={styles.infoTopline}>
              <Typography variant="h5" sx={styles.measureId}>
                {id}
              </Typography>
              <Tooltip title={TOOLTIP_MESSAGES.DeleteMeasure}>
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
      </Tooltip>
      <ConfirmationModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        handleAction={() => removeTrackedMeasureById(id)}
        message={`Delete ${id}?`}
        subtitle="Are you sure you want to remove this measure from your tracked measures? This action cannot be undone."
      />
      <MeasureModal
        anchorEl={measureAnchorEl}
        onClose={closeMeasureModal}
        measureId={id}
      />
    </>
  );
};

export default SidebarMeasure;
