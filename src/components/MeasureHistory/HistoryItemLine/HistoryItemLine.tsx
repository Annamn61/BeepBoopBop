import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getMMHHFromDate } from '../../../utils/time'
import { getMeasureTitle } from '../../../utils/measure';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';

interface HistoryItemProps {
    action: any,
}

const HistoryItemLine = ({action}: HistoryItemProps) => {
    console.log('action', action);

  return (
    <Box sx={{
        display: 'flex', 
        flexDirection: 'row',
        gap: 1,
    }}>
        <Typography sx={{width: '70px', color: '#A7A7A7'}}>{getMMHHFromDate(new Date(action.ActionDate))}</Typography>
        <MeasurePill title={getMeasureTitle(action.MeasurePrefix, action.MeasureNumber)} />
        <Typography>{action.ActionText}</Typography>
  </Box>
  )
}

export default HistoryItemLine