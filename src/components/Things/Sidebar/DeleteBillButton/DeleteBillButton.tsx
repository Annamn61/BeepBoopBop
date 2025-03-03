import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmationModal from '../../../Accessories/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../../../utils/modal';
import useMeasureStore from '../../../../store/MeasureStore';
import { Measure } from '../../../../types/MeasureTypes';

interface Props {
  measureId: Measure['id'];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DeleteBillButton = ({ measureId, onMouseEnter, onMouseLeave }: Props) => {
  const { anchorEl, setModalClosed, setModalOpen } = useModal();
  const { removeTrackedMeasureById } = useMeasureStore();

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
        handleAction={() => removeTrackedMeasureById(measureId)}
        message={`Delete ${measureId}?`}
        subtitle="Are you sure you want to remove this measure from your tracked measures? This action cannot be undone."
      />
    </>
  );
};

export default DeleteBillButton;
