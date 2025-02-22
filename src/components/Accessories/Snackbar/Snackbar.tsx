import Snackbar from '@mui/material/Snackbar';
import { useSnackbarStore } from '../../../store/SnackbarStore';
import Alert from '@mui/material/Alert';

export const SnackbarProvider = () => {
  const { queue, closeSnackbar } = useSnackbarStore();

  return (
    <>
      {queue.map((snackbar, index) => (
        <Snackbar
          key={index}
          open
          autoHideDuration={5000}
          onClose={() => closeSnackbar()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{ bottom: 50 * index + 24 }} // Stagger the position
        >
          <Alert
            variant="filled"
            onClose={() => closeSnackbar()}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
