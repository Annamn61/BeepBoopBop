import Box from '@mui/material/Box';
import {
  UserTrackedMeasure,
  UserTrackedMeasureWithSource,
} from '../../../../types/MeasureTypes';
import { styles } from './SidebarMeasure.styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import ConfirmationModal from '../../../Accessories/ConfirmationModal/ConfirmationModal';
import { AddBillModal } from '../AddBillModal/AddBillModal';
import { useModal } from '../../../../utils/modal';
import Tooltip from '@mui/material/Tooltip';
import MeasureModal from '../../../Accessories/MeasureModal/MeasureModal';
import { TOOLTIP_MESSAGES } from '../../../../utils/constants';
import ColorSquare from '../../../Accessories/ColorSquare/ColorSquare';
import { useUserStore } from '../../../../store/UserStore';
import { getMeasureUniqueId, getReadableId } from '../../../../utils/measure';
import useMeasureStore from '../../../../store/MeasureStore';
import Skeleton from '@mui/material/Skeleton';
import { useUser } from '../../../../utils/user';
import {
  removeMeasure,
  removeMeasureFromGroup,
  updateMeasure,
  updateMeasureInGroup,
  getUserGroupMeasures,
} from '../../../../data/firebaseFirestore';

interface SidebarMeasureProps {
  userTrackedMeasure: UserTrackedMeasure | UserTrackedMeasureWithSource;
  isDuplicate?: boolean;
  isGroupMeasure?: boolean;
  groupId?: string;
  isGroupAdmin?: boolean;
  onGroupMeasureRemoved?: () => void;
}

const SidebarMeasure = ({
  userTrackedMeasure,
  isDuplicate,
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
    anchorEl: editAnchorEl,
    setModalClosed: closeEditModal,
    setModalOpen: openEditModal,
  } = useModal();

  const {
    removeTrackedMeasureById,
    setUserTrackedMeasureFilterStatusById,
    updateUserTrackedMeasure,
    setGroupMeasures,
  } = useUserStore();

  const { getMeasureNicknameById } = useMeasureStore();
  const loadingMeasureIds = useMeasureStore((state) => state.loadingMeasureIds);
  const { currentUser } = useUser();

  const { isDisplayed, color, nickname, position } = userTrackedMeasure;
  const uniqueId = getMeasureUniqueId(userTrackedMeasure);
  const isLoading = loadingMeasureIds.has(uniqueId);

  // Use nickname from the measure object, or fall back to catchline from OLIS data
  // This works for both user measures and group measures
  const title = nickname || getMeasureNicknameById(uniqueId);
  // Use color directly from userTrackedMeasure - group measures now have their own color stored
  const measureColor = color;

  if (isLoading) {
    return (
      <Box sx={styles.measureFilterContainer}>
        <Tooltip title={TOOLTIP_MESSAGES.ToggleVisibility}>
          <Button sx={styles.checkbox} disabled>
            <ColorSquare color={measureColor} filled={isDisplayed} />
          </Button>
        </Tooltip>
        <Box sx={styles.infoArea}>
          <Box sx={styles.infoTopline}>
            <Typography variant="h5" sx={styles.measureId}>
              {getReadableId(userTrackedMeasure)}
            </Typography>
          </Box>
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
        <Box
          sx={styles.measureFilterContainer}
          onClick={(e: React.MouseEvent<HTMLElement>) => openMeasureModal(e)}
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
            >
              <ColorSquare color={measureColor} filled={isDisplayed} />
            </Button>
          </Tooltip>
          <Box sx={styles.infoArea}>
            <Box sx={styles.infoTopline}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    ...styles.measureId,
                    ...(isDuplicate && { textDecoration: 'line-through' }),
                  }}
                >
                  {getReadableId(userTrackedMeasure)}
                </Typography>
                {position === 'Support' && '🌍'}
                {position === 'Oppose' && '🚨'}
                {isDuplicate && (
                  <Chip
                    label="Duplicate"
                    size="small"
                    sx={styles.duplicateTag}
                  />
                )}
              </Box>
              {(!isGroupMeasure || isGroupAdmin) && (
                <Box>
                  <Tooltip title="Edit measure">
                    <IconButton
                      id="editIcon"
                      sx={styles.deleteIcon}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(e);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
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
          isGroupMeasure &&
          'source' in userTrackedMeasure &&
          typeof userTrackedMeasure.source === 'object' &&
          userTrackedMeasure.source.type === 'group'
            ? `Are you sure you want to remove this measure from the ${userTrackedMeasure.source.groupName} group? This action will delete the measure for all members and cannot be undone.`
            : 'Are you sure you want to remove this measure from your tracked measures? This action cannot be undone.'
        }
      />
      <MeasureModal
        anchorEl={measureAnchorEl}
        onClose={closeMeasureModal}
        measureId={uniqueId}
      />
      {(!isGroupMeasure || (isGroupMeasure && isGroupAdmin)) && (
        <AddBillModal
          title="Edit Bill"
          tooltip="Edit bill"
          triggerIcon="edit"
          initialValues={userTrackedMeasure}
          anchorEl={editAnchorEl as HTMLButtonElement | null}
          onClose={closeEditModal}
          onOpen={(e) => openEditModal(e as React.MouseEvent<HTMLElement>)}
          onAdd={async (
            measurePrefix: string,
            measureNumber: number,
            measureColor: string,
            sessionKey: string,
            nickname: string,
            position: 'Support' | 'Oppose' | '?'
          ) => {
            if (isGroupMeasure && groupId) {
              // Update group measure
              const updatedMeasure: UserTrackedMeasure = {
                ...userTrackedMeasure,
                MeasurePrefix: measurePrefix,
                MeasureNumber: measureNumber,
                color: measureColor,
                SessionKey: sessionKey,
                nickname: nickname,
                position: position,
              };

              try {
                await updateMeasureInGroup(groupId, uniqueId, updatedMeasure);
                // Refresh group measures in store
                if (currentUser) {
                  const groupMeasures = await getUserGroupMeasures(
                    currentUser.uid
                  );
                  setGroupMeasures(groupMeasures);
                }
                if (onGroupMeasureRemoved) {
                  onGroupMeasureRemoved();
                }
              } catch (error) {
                console.error('Error updating measure in group:', error);
              }
            } else {
              // Update user measure
              const updatedMeasure: UserTrackedMeasure = {
                ...userTrackedMeasure,
                MeasurePrefix: measurePrefix,
                MeasureNumber: measureNumber,
                color: measureColor,
                SessionKey: sessionKey,
                nickname: nickname,
                position: position,
              };

              // Optimistically update the store
              updateUserTrackedMeasure(uniqueId, updatedMeasure);

              // Update in Firebase if user is logged in
              if (currentUser) {
                try {
                  await updateMeasure(
                    currentUser.uid,
                    uniqueId,
                    updatedMeasure
                  );
                } catch (error) {
                  console.error('Error updating measure in Firebase:', error);
                  // TODO: Could revert the optimistic update here if needed
                }
              }
            }
          }}
        />
      )}
    </>
  );
};

export default SidebarMeasure;
