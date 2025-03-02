import Box from '@mui/material/Box';
import {
  importantDateCalendarUrl,
  importantDates,
} from '../../../data/ImportantLegistlativeDates';
import { styles } from './Deadline.styles';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface Props {
  dateKey: string;
}

const Deadline = ({ dateKey }: Props) => {
  const deadlineText = importantDates[dateKey];
  return (
    <Box sx={styles.container}>
      <Typography>Next Legislative Deadline: {deadlineText}</Typography>
      <IconButton href={importantDateCalendarUrl} target="_blank">
        <LaunchRoundedIcon sx={styles.launchIcon} fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Deadline;
