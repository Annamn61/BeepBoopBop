import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { MEASURE_COLORS } from '../../../../utils/colors';
import ColorSquare from '../../../Accessories/ColorSquare/ColorSquare';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styles } from './AddBillModal.styles';
import ColorSelectorPopover from '../AddTrackedBill/ColorSelectorPopover/ColorSelectorPopover';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';

interface AddBillModalProps {
  title: string;
  tooltip: string;
  onAdd: (
    measurePrefix: string,
    measureNumber: number,
    measureColor: string,
    sessionKey: string,
    nickname: string
  ) => Promise<void> | void;
}

export const AddBillModal = ({ title, tooltip, onAdd }: AddBillModalProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const [measurePrefix, setMeasurePrefix] = useState('');
  const [measureNumber, setMeasureNumber] = useState('');
  const [measureColor, setMeasureColor] = useState(MEASURE_COLORS.SAGE);
  const [sessionKey, setSessionKey] = useState('2025R1');
  const [nickname, setNickname] = useState('');

  const resetState = () => {
    setMeasurePrefix('');
    setMeasureNumber('');
    setMeasureColor(MEASURE_COLORS.SAGE);
    setSessionKey('2025R1');
    setNickname('');
  };

  useEffect(() => {
    resetState();
  }, [anchorEl]);

  const handleAdd = async () => {
    if (!measurePrefix || !measureNumber) return;

    setAnchorEl(null);
    await onAdd(
      measurePrefix,
      Number(measureNumber),
      measureColor,
      sessionKey,
      nickname
    );
  };

  return (
    <>
      <Tooltip title={tooltip}>
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
            {title}
          </Typography>
          <Box sx={styles.form}>
            <TextField
              sx={styles.prefix}
              placeholder="HB"
              value={measurePrefix}
              inputRef={inputRef}
              onChange={(e) => setMeasurePrefix(e.target.value)}
            />
            <TextField
              sx={styles.number}
              placeholder="2024"
              value={measureNumber}
              onChange={(e) => setMeasureNumber(e.target.value)}
            />
            <Button
              sx={styles.color}
              onClick={(e) => setColorAnchorEl(e.currentTarget)}
            >
              <ColorSquare color={measureColor} />
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
            fullWidth
          />
          <TextField
            sx={styles.nickname}
            placeholder="Nickname (optional)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
          />
          <Button
            variant="filled"
            onClick={handleAdd}
            disabled={!measurePrefix || !measureNumber}
          >
            Add
          </Button>
        </Box>
      </Popover>
    </>
  );
};
