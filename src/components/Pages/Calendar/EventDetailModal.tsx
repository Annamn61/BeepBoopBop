import { Link, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useMeasureStore } from '../../../store/MeasureStore';

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
  measureId: string | undefined;
  event: any;
}

// TODO: Andrew add logic to get measure from store using the measure id value passed in as a prop

const EventDetailModal = ({
  open,
  handleClose,
  measureId,
  event,
}: EventDetailModalProps) => {
  const { getMeasureById } = useMeasureStore();
  const measure = getMeasureById(measureId);

  // Get details about the event

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>{`${measure?.id}`}</Typography>
        <Typography>{`Current Location: ${measure?.CurrentLocation}`}</Typography>
        <Typography>{`Current Event: ${event?.title}`}</Typography>
        <Typography>
          {`Measure Documents: `}{' '}
          <Link
            href={measure?.MeasureDocuments[0].DocumentUrl}
            target="_target"
          >
            View Here
          </Link>
        </Typography>
        {/* TODO: Add the history of this specific measure */}
        {measure?.MeasureHistoryActions[0].ActionText}
      </Box>
    </Modal>
  );
};

export default EventDetailModal;
