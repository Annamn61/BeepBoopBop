import { Modal } from '@mui/material';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface EventDetailModalProps {
  open: boolean;
  handleClose: () => void;
  measureId: number | undefined;
};

// TODO: Andrew add logic to get measure from store using the measure id value passed in as a prop

const EventDetailModal = ({open, handleClose, measureId}: EventDetailModalProps) => {

  console.log(measureId);
  return (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {measureId}
    </Box>
  </Modal>
)};

export default EventDetailModal;