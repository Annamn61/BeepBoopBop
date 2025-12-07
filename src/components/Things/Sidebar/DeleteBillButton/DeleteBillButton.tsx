import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmationModal from '../../../Accessories/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../../../utils/modal';
import { Measure } from '../../../../types/MeasureTypes';
import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { removeMeasure } from '../../../../data/firebaseFirestore';

interface Props {
  measureId: Measure['id'];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DeleteBillButton = ({ measureId, onMouseEnter, onMouseLeave }: Props) => {
  const { anchorEl, setModalClosed, setModalOpen } = useModal();
  const { removeTrackedMeasureById } = useUserStore();
  const { currentUser } = useUser();

  return (
    <>
      <Tooltip title="Remove bill from tracking">
        <IconButton
          id="deleteIcon"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(e);
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Tooltip>
      <ConfirmationModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        handleAction={async () => {
          // Optimistically remove from store (disappears immediately)
          removeTrackedMeasureById(measureId);

          // Remove from Firebase if user is logged in
          if (currentUser) {
            try {
              await removeMeasure(currentUser.uid, measureId);
            } catch (error) {
              console.error('Error removing measure from Firebase:', error);
              // TODO: Could revert the optimistic update here if needed
            }
          }
        }}
        message={`Delete ${measureId}?`}
        subtitle="Are you sure you want to remove this measure from your tracked measures? This action cannot be undone."
      />
    </>
  );
};

export default DeleteBillButton;
