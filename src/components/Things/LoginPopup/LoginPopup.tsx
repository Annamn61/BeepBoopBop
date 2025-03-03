import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { styles } from './LoginPopup.styles';
import { Login } from '../../Accessories/Login';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  //   updateColor: (color: string) => void;
}

const LoginPopup = ({ anchorEl, onClose }: Props) => {
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
        <Login />
        {/* {Object.values(MEASURE_COLORS).map((hex) => (
          <IconButton
            onClick={() => {
              updateColor(hex);
              setTimeout(onClose, 0);
            }}
          >
            <ColorSquare color={hex} />
          </IconButton>
        ))} */}
      </Box>
    </Popover>
  );
};

export default LoginPopup;
