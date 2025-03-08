import Box from '@mui/material/Box';
import { UserTrackedMeasure } from '../../../../types/MeasureTypes';
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
import { useUserStore } from '../../../../store/UserStore';
import { getMeasureUniqueId, getReadableId } from '../../../../utils/measure';
import useMeasureStore from '../../../../store/MeasureStore';

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
    removeTrackedMeasureById,
    setUserTrackedMeasureFilterStatusById,
    getUserMeasureColorById,
  } = useUserStore();

  const { getMeasureNicknameById } = useMeasureStore();

  const { isDisplayed } = userTrackedMeasure;
  const uniqueId = getMeasureUniqueId(userTrackedMeasure);

  const title = getMeasureNicknameById(uniqueId);
  const measureColor = getUserMeasureColorById(uniqueId);

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
                setUserTrackedMeasureFilterStatusById(uniqueId, !isDisplayed);
              }}
            >
              <ColorSquare color={measureColor} filled={isDisplayed} />
            </Button>
          </Tooltip>
          <Box sx={styles.infoArea}>
            <Box sx={styles.infoTopline}>
              <Typography variant="h5" sx={styles.measureId}>
                {getReadableId(userTrackedMeasure)}
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
        handleAction={() => removeTrackedMeasureById(uniqueId)}
        message={`Delete ${uniqueId}?`}
        subtitle="Are you sure you want to remove this measure from your tracked measures? This action cannot be undone."
      />
      <MeasureModal
        anchorEl={measureAnchorEl}
        onClose={closeMeasureModal}
        measureId={uniqueId}
      />
    </>
  );
};

export default SidebarMeasure;
