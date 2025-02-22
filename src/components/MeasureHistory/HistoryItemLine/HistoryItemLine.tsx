import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getMMHHFromDate } from '../../../utils/time';
import { getMeasureId } from '../../../utils/measure';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';
import { styles } from './HistoryItemLine.styles';

interface HistoryItemProps {
  action: any;
}

const HistoryItemLine = ({ action }: HistoryItemProps) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="subtitle2" sx={styles.time}>
        {getMMHHFromDate(new Date(action.ActionDate))}
      </Typography>
      <MeasurePill
        id={getMeasureId(action.MeasurePrefix, action.MeasureNumber)}
        withModal={true}
      />
      <Typography variant="body1">{action.ActionText}</Typography>
    </Box>
  );
};

export default HistoryItemLine;
