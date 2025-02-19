import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { MEASURE_COLORS } from '../../../utils/colors';
import ColorSquare from '../../Accessories/ColorSquare/ColorSquare';
import useMeasureStore from '../../../store/MeasureStore';

export const AddTrackedBill = () => {
  const { addUserTrackedMeasure } = useMeasureStore();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [colorAnchorEl, setColorAnchorEl] =
    useState<HTMLButtonElement | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [measureId, setMeasureId] = useState('');
  const [measureColor, setMeasureColor] = useState(MEASURE_COLORS.SAGE);
  const [sessionKey, setSessionKey] = useState('2025R1');

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AddRoundedIcon />
      </IconButton>
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
        <Box
          sx={{
            padding: 3,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-end',
          }}
        >
          <Typography sx={{ fontWeight: 600, width: '100%' }} variant="h6">
            Add Bill to Track
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField
              sx={{ width: '140px' }}
              placeholder="Bill Number"
              value={measureId}
              inputRef={inputRef}
              onChange={(e) => setMeasureId(e.target.value)}
            />
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0px 16px',
                backgroundColor: '#EFEFEF',
                gap: 2,
                alignItems: 'center',
                borderRadius: '8px',
                position: 'relative',
              }}
              onClick={(e) => setColorAnchorEl(e.currentTarget)}
            >
              <ColorSquare color={measureColor} />
              <AddRoundedIcon />
              {/* <KeyboardArrowDownRoundedIcon /> */}
              <Popover
                open={!!colorAnchorEl}
                anchorEl={colorAnchorEl}
                sx={{
                  marginTop: 1,
                }}
                onClose={() => {
                  setTimeout(() => setColorAnchorEl(null), 0); // !! forces a rerender, something to do with double popovers?
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '144px',
                    flexWrap: 'wrap',
                  }}
                >
                  {Object.values(MEASURE_COLORS).map((hex) => (
                    <IconButton
                      onClick={() => {
                        setMeasureColor(hex);
                        setTimeout(() => setColorAnchorEl(null), 0);
                      }}
                    >
                      <ColorSquare color={hex} />
                    </IconButton>
                  ))}
                </Box>
              </Popover>
            </Button>
          </Box>
          <TextField
            sx={{ width: '100%' }}
            placeholder="Session Key"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
          />
          <Button
            sx={{
              width: 'fit-content',
              backgroundColor: '#3E753B',
              borderRadius: '100px',
              padding: '8px 24px',
            }}
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
