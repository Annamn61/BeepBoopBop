import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getMMHHFromDate } from '../../../utils/time'
import { getMeasureId } from '../../../utils/measure';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';

interface HistoryItemProps {
    action: any,
}

const HistoryItemLine = ({action}: HistoryItemProps) => {

  return (
    <Box sx={{
        display: 'flex', 
        flexDirection: 'row',
        gap: 1,
    }}>
        <Typography sx={{width: '70px', color: '#A7A7A7', flexShrink: 0}}>{getMMHHFromDate(new Date(action.ActionDate))}</Typography>
        <MeasurePill id={getMeasureId(action.MeasurePrefix, action.MeasureNumber)} />
        <Typography>{action.ActionText}</Typography>
  </Box>
  )
}

export default HistoryItemLine