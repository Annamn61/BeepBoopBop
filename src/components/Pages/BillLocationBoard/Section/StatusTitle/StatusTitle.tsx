import Box from '@mui/material/Box';
import { styles } from './StatusTitle.styles';
import { Typography } from '@mui/material';

interface StatusTitleProps {
  title: string;
}

const StatusTitle = ({ title }: StatusTitleProps) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={styles.divider} />
    </Box>
  );
};

export default StatusTitle;
