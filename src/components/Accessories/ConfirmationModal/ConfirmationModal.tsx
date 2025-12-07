import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { styles } from './ConfirmationModal.styles';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleAction: () => void;
  message: string;
  subtitle: string;
}

const ConfirmationModal = ({
  anchorEl,
  onClose,
  handleAction,
  message,
  subtitle,
}: Props) => {
  return (
    <Dialog open={!!anchorEl} onClose={onClose}>
      <Box sx={styles.container}>
        <Typography variant="h5">{message}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
        <Box sx={styles.buttonContainer}>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleAction();
              onClose();
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
