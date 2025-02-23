import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { MEASURE_COLORS } from '../../../utils/colors';
import ColorSquare from '../../Accessories/ColorSquare/ColorSquare';
import useMeasureStore from '../../../store/MeasureStore';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styles } from './AddTrackedBill.styles';
import ColorSelectorPopover from './ColorSelectorPopover/ColorSelectorPopover';
import Tooltip from '@mui/material/Tooltip';

export const AddTrackedBill = () => {
  const { addUserTrackedMeasure } = useMeasureStore();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const [measureId, setMeasureId] = useState('');
  const [measureColor, setMeasureColor] = useState(MEASURE_COLORS.SAGE);
  const [sessionKey, setSessionKey] = useState('2025R1');

  const resetState = () => {
    setMeasureId('');
    setMeasureColor(MEASURE_COLORS.SAGE);
    setSessionKey('2025R1');
  };

  useEffect(() => {
    resetState();
  }, [anchorEl]);

  return (
    <>
      <Tooltip title="Add bill to track">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setColorAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onAnimationEnd={() => inputRef.current?.focus()}
      >
        <Box sx={styles.container}>
          <Typography variant="h2" sx={styles.title}>
            Add Bill to Track
          </Typography>
          <Box sx={styles.form}>
            <TextField
              // Steals focus back after second popover is closed by clicking on first popover ?????
              sx={styles.billNumber}
              placeholder="Bill Number"
              value={measureId}
              inputRef={inputRef}
              onChange={(e) => setMeasureId(e.target.value)}
            />
            <Button
              sx={styles.color}
              onClick={(e) => setColorAnchorEl(e.currentTarget)}
            >
              <ColorSquare color={measureColor} />
              {/* TODO: Up/down when open/closed */}
              <KeyboardArrowDownRoundedIcon />
              <ColorSelectorPopover
                anchorEl={colorAnchorEl}
                onClose={() => setColorAnchorEl(null)}
                updateColor={setMeasureColor}
              />
            </Button>
          </Box>
          <TextField
            sx={styles.sessionKey}
            placeholder="Session Key"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
          />
          <Button
            sx={styles.addButton}
            variant="contained"
            onClick={() => {
              setAnchorEl(null);
              addUserTrackedMeasure({
                color: measureColor,
                position: 'Support',
                id: measureId,
                isDisplayed: true,
                sessionKey,
              });
            }}
          >
            Add
          </Button>
        </Box>
      </Popover>
    </>
  );
};
