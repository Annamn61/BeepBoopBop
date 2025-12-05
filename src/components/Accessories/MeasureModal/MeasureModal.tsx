import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Measure from '../../Pages/Measure/Measure';
import { styles } from './MeasureModal.styles';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  measureId: string | undefined;
}

const MeasureModal = ({ anchorEl, onClose, measureId }: Props) => {
  return (
    <Dialog maxWidth="lg" open={!!anchorEl} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Measure measureModalId={measureId} onModalClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default MeasureModal;
