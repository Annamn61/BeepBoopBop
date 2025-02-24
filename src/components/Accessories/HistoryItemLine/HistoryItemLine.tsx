import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  getShortFormatDateWithTime,
  getMMHHFromDate,
} from '../../../utils/time';
import { getMeasureId } from '../../../utils/measure';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';
import { MeasureHistoryItem } from '../../../types/MeasureTypes';
import { styles } from './HistoryItemLine.styles';

interface HistoryItemProps {
  historyItem: MeasureHistoryItem;
  variant: 'full' | 'light';
}

export const HistoryItemLine = ({ historyItem, variant }: HistoryItemProps) => {
  if (variant === 'full') {
    return (
      <Box sx={styles.container}>
        <Typography variant="subtitle2" sx={styles.time}>
          {getMMHHFromDate(new Date(historyItem.ActionDate))}
        </Typography>
        <MeasurePill
          id={getMeasureId(
            historyItem.MeasurePrefix,
            historyItem.MeasureNumber
          )}
          withModal={true}
        />
        <Typography variant="body1">{historyItem.ActionText}</Typography>
      </Box>
    );
  } else {
    return (
      <Box sx={styles.container}>
        <Typography variant="body2" sx={styles.longTime}>
          {getShortFormatDateWithTime(new Date(historyItem.ActionDate))}
        </Typography>
        <Typography variant="body1">{historyItem.ActionText}</Typography>
      </Box>
    );
  }
};

export default HistoryItemLine;
