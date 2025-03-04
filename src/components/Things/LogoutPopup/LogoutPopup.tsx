import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { styles } from './LogoutPopup.styles';
import { logout } from '../../../utils/firebaseAuth';
import Button from '@mui/material/Button';

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
      sx={styles.popover}
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
        <Button onClick={logout}>Lougout</Button>
      </Box>
    </Popover>
  );
};

export default LogoutPopup;
