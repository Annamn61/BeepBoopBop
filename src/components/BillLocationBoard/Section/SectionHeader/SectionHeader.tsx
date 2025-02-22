import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styles } from './SectionHeader.styles';

interface SectionHeaderProps {
  title: string;
  billCount: number;
}

const SectionHeader = ({ title, billCount }: SectionHeaderProps) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">{title}</Typography>
      <Box sx={styles.count}>
        <Typography>{billCount}</Typography>
      </Box>
    </Box>
  );
};

export default SectionHeader;
