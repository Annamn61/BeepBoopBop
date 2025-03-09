import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { styles } from './LogoutPopup.styles';
import { logout } from '../../../utils/firebaseAuth';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  //   updateColor: (color: string) => void;
}

const LogoutPopup = ({ anchorEl, onClose }: Props) => {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setTimeout(onClose, 0)} // !! forces a rerender, something to do with double popovers?
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={styles.container}>
        <Typography>Are you sure you want to logout?</Typography>
        <Box sx={styles.buttons}>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="filled" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default LogoutPopup;
