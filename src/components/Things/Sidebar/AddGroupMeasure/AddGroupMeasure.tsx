import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { MEASURE_COLORS } from '../../../../utils/colors';
import ColorSquare from '../../../Accessories/ColorSquare/ColorSquare';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { styles } from './AddGroupMeasure.styles';
import ColorSelectorPopover from '../AddTrackedBill/ColorSelectorPopover/ColorSelectorPopover';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import {
  addMeasureToGroup,
  getUserGroupMeasures,
} from '../../../../data/firebaseFirestore';
import { getMeasureUniqueId } from '../../../../utils/measure';
import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';

interface AddGroupMeasureProps {
  groupId: string;
  onMeasureAdded?: () => void;
}

export const AddGroupMeasure = ({
  groupId,
  onMeasureAdded,
}: AddGroupMeasureProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { setGroupMeasures } = useUserStore();
  const { currentUser } = useUser();

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
      <Tooltip title="Add measure to group">
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
            Add Measure to Group
          </Typography>
          <Box sx={styles.form}>
            <TextField
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
              const measureUniqueId = getMeasureUniqueId({
                MeasurePrefix: measureId.split(' ')[0],
                MeasureNumber: Number(measureId.split(' ')[1]),
                SessionKey: sessionKey,
              });

              setAnchorEl(null);

              // Save to Firebase
              try {
                await addMeasureToGroup(groupId, measureUniqueId);
                // Refresh group measures in store
                if (currentUser) {
                  const groupMeasures = await getUserGroupMeasures(
                    currentUser.uid
                  );
                  setGroupMeasures(groupMeasures);
                }
                if (onMeasureAdded) {
                  onMeasureAdded();
                }
              } catch (error) {
                console.error('Error adding measure to group:', error);
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
