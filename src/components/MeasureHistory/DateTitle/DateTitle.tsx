import { getDaysAgo } from '../../../utils/time';
import Box from '@mui/material/Box';
import { styles } from './DateTitle.styles';

interface DateTitleProps {
  dateString: string;
}

const DateTitle = ({ dateString }: DateTitleProps) => {
  var date = new Date(`${dateString}T00:00:00.000`);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.dateAndDaysAgo}>
        <Box sx={styles.date}>{date.toLocaleDateString()}</Box>
        <Box sx={styles.daysAgo}>{getDaysAgo(date)}</Box>
      </Box>
      <Box sx={styles.divider} />
    </Box>
  );
};

export default DateTitle;
