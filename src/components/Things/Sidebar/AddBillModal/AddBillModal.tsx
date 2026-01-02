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
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { UserTrackedMeasure } from '../../../../types/MeasureTypes';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface AddBillModalProps {
  title: string;
  tooltip: string;
  onAdd: (
    measurePrefix: string,
    measureNumber: number,
    measureColor: string,
    sessionKey: string,
    nickname: string,
    position: 'Support' | 'Oppose' | '?'
  ) => Promise<void> | void;
  initialValues?: UserTrackedMeasure;
  triggerIcon?: 'add' | 'edit';
  anchorEl?: HTMLButtonElement | null;
  onClose?: () => void;
  onOpen?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AddBillModal = ({
  title,
  tooltip,
  onAdd,
  initialValues,
  triggerIcon = 'add',
  anchorEl: externalAnchorEl,
  onClose: externalOnClose,
  onOpen: externalOnOpen,
}: AddBillModalProps) => {
  const [internalAnchorEl, setInternalAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const anchorEl =
    externalAnchorEl !== undefined ? externalAnchorEl : internalAnchorEl;
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const [measurePrefix, setMeasurePrefix] = useState('');
  const [measureNumber, setMeasureNumber] = useState('');
  const [measureColor, setMeasureColor] = useState(MEASURE_COLORS.SAGE);
  const [sessionKey, setSessionKey] = useState('2025R1');
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState<'Support' | 'Oppose' | '?'>('?');

  const resetState = () => {
    if (initialValues) {
      setMeasurePrefix(initialValues.MeasurePrefix);
      setMeasureNumber(initialValues.MeasureNumber.toString());
      setMeasureColor(initialValues.color);
      setSessionKey(initialValues.SessionKey);
      setNickname(initialValues.nickname);
      setPosition(initialValues.position);
    } else {
      setMeasurePrefix('');
      setMeasureNumber('');
      setMeasureColor(MEASURE_COLORS.SAGE);
      setSessionKey('2025R1');
      setNickname('');
      setPosition('?');
    }
  };

  useEffect(() => {
    resetState();
  }, [anchorEl, initialValues]);

  const handleAdd = async () => {
    if (!measurePrefix || !measureNumber) return;

    if (externalAnchorEl !== undefined && externalOnClose) {
      externalOnClose();
    } else {
      setInternalAnchorEl(null);
    }
    setColorAnchorEl(null);
    await onAdd(
      measurePrefix,
      Number(measureNumber),
      measureColor,
      sessionKey,
      nickname,
      position
    );
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (externalOnOpen) {
      externalOnOpen(e);
    } else {
      setInternalAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    if (externalAnchorEl !== undefined && externalOnClose) {
      externalOnClose();
    } else {
      setInternalAnchorEl(null);
    }
    setColorAnchorEl(null);
  };

  const Icon = triggerIcon === 'edit' ? EditIcon : AddRoundedIcon;

  return (
    <>
      {triggerIcon === 'add' && (
        <Tooltip title={tooltip}>
          <IconButton onClick={handleOpen}>
            <Icon />
          </IconButton>
        </Tooltip>
      )}
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl || null}
        onClose={handleClose}
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
          <FormControl fullWidth>
            <InputLabel>Position (optional)</InputLabel>
            <Select
              value={position}
              label="Position (optional)"
              onChange={(e) =>
                setPosition(e.target.value as 'Support' | 'Oppose' | '?')
              }
            >
              <MenuItem value="?">Not selected</MenuItem>
              <MenuItem value="Support"> 🌍 Support</MenuItem>
              <MenuItem value="Oppose"> 🚨 Oppose</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="filled"
            onClick={handleAdd}
            disabled={!measurePrefix || !measureNumber}
          >
            {initialValues ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Popover>
    </>
  );
};
