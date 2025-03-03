import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { styles } from './ColorSelectorPopover.styles';
import { MEASURE_COLORS } from '../../../../../utils/colors';
import IconButton from '@mui/material/IconButton';
import ColorSquare from '../../../../Accessories/ColorSquare/ColorSquare';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  updateColor: (color: string) => void;
}

const ColorSelectorPopover = ({ anchorEl, onClose, updateColor }: Props) => {
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
      <Box sx={styles.colorsContainer}>
        {Object.values(MEASURE_COLORS).map((hex) => (
          <IconButton
            onClick={() => {
              updateColor(hex);
              setTimeout(onClose, 0);
            }}
          >
            <ColorSquare color={hex} />
          </IconButton>
        ))}
      </Box>
    </Popover>
  );
};

export default ColorSelectorPopover;
