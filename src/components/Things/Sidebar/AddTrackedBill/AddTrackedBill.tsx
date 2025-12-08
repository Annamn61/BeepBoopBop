import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { MEASURE_COLORS } from '../../../../utils/colors';
import ColorSquare from '../../../Accessories/ColorSquare/ColorSquare';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styles } from './AddTrackedBill.styles';
import ColorSelectorPopover from './ColorSelectorPopover/ColorSelectorPopover';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { addMeasure } from '../../../../data/firebaseFirestore';

export const AddTrackedBill = () => {
  const { addUserTrackedMeasure } = useUserStore();
  const { currentUser } = useUser();
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
            disabled={true}
            placeholder="Session Key"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
          />
          <Button
            variant="filled"
            onClick={async () => {
              const newMeasure = {
                color: measureColor,
                position: '?' as const,
                MeasurePrefix: measureId.split(' ')[0],
                MeasureNumber: Number(measureId.split(' ')[1]),
                isDisplayed: true,
                SessionKey: sessionKey,
                nickname: '',
              };

              setAnchorEl(null);

              // Optimistically update the store (appears immediately)
              addUserTrackedMeasure(newMeasure);

              // Save to Firebase if user is logged in
              if (currentUser) {
                try {
                  await addMeasure(currentUser.uid, newMeasure);
                } catch (error) {
                  console.error('Error adding measure to Firebase:', error);
                  // TODO: Could revert the optimistic update here if needed
                }
              }
            }}
          >
            Add
          </Button>
        </Box>
      </Popover>
    </>
  );
};
