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
import { useUser } from '../../../../utils/user';
import {
  removeMeasure,
  removeMeasureFromGroup,
} from '../../../../data/firebaseFirestore';

interface SidebarMeasureProps {
  userTrackedMeasure: UserTrackedMeasure;
  isDuplicate?: boolean;
  groupNickname?: string;
  isGroupMeasure?: boolean;
  groupId?: string;
  isGroupAdmin?: boolean;
  onGroupMeasureRemoved?: () => void;
}

const SidebarMeasure = ({
  userTrackedMeasure,
  isDuplicate,
  groupNickname,
  isGroupMeasure,
  groupId,
  isGroupAdmin,
  onGroupMeasureRemoved,
}: SidebarMeasureProps) => {
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
  const { currentUser } = useUser();

  const { isDisplayed } = userTrackedMeasure;
  const uniqueId = getMeasureUniqueId(userTrackedMeasure);

  const title = groupNickname || getMeasureNicknameById(uniqueId);
  const measureColor = getUserMeasureColorById(uniqueId);

  return (
    <>
      <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
        <Box
          sx={
            {
              ...styles.measureFilterContainer,
              ...(isDuplicate ? styles.disabled : {}),
            } as any
          }
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            !isDuplicate && openMeasureModal(e)
          }
          role="button"
        >
          <Tooltip title={TOOLTIP_MESSAGES.ToggleVisibility}>
            <Button
              sx={styles.checkbox}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (!isDuplicate) {
                  setUserTrackedMeasureFilterStatusById(uniqueId, !isDisplayed);
                }
              }}
              disabled={isDuplicate}
            >
              <ColorSquare color={measureColor} filled={isDisplayed} />
            </Button>
          </Tooltip>
          <Box sx={styles.infoArea}>
            <Box sx={styles.infoTopline}>
              <Typography variant="h5" sx={styles.measureId}>
                {getReadableId(userTrackedMeasure)}
              </Typography>
              {(!isGroupMeasure || isGroupAdmin) && (
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
              )}
            </Box>
            <Typography variant="body1">{title}</Typography>
          </Box>
        </Box>
      </Tooltip>
      <ConfirmationModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        handleAction={async () => {
          if (isGroupMeasure && groupId) {
            // Remove from group
            try {
              await removeMeasureFromGroup(groupId, uniqueId);
              // Refresh group measures
              onGroupMeasureRemoved?.();
            } catch (error) {
              console.error('Error removing measure from group:', error);
            }
          } else {
            // Remove from user measures
            // Optimistically remove from store (disappears immediately)
            removeTrackedMeasureById(uniqueId);

            // Remove from Firebase if user is logged in
            if (currentUser) {
              try {
                await removeMeasure(currentUser.uid, uniqueId);
              } catch (error) {
                console.error('Error removing measure from Firebase:', error);
                // TODO: Could revert the optimistic update here if needed
              }
            }
          }
        }}
        message={`Delete ${uniqueId}?`}
        subtitle={
          isGroupMeasure
            ? `Are you sure you want to remove this measure from the ${groupNickname} group? This action will delete the measure for all members and cannot be undone.`
            : 'Are you sure you want to remove this measure from your tracked measures? This action cannot be undone.'
        }
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
