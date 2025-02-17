import { getDaysAgo } from '../../../utils/time';
import './DateTitle.css'
import Box from '@mui/material/Box'

interface DateTitleProps {
    dateString: string,
}

const DateTitle = ({dateString}: DateTitleProps) => {
    const date = new Date(dateString);
    return (
        <div className="date-title-container">
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <div className="date-title">{date.toLocaleDateString()}</div>
            <Box sx={{color: '#a7a7a7'}}>{getDaysAgo(date)}</Box>
            </Box>
            <div className="date-divider" />
        </div>
    );
}

export default DateTitle;