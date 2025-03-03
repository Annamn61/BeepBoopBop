import Box from '@mui/material/Box';
import { styles } from './GroupTitle.styles';
import { Typography } from '@mui/material';

interface GroupTitleProps {
  group: any; //TODO: Fix any
}

const GroupTitle = ({ group }: GroupTitleProps) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6">{group.group}</Typography>
      <Box sx={styles.divider} />
    </Box>
  );
};

export default GroupTitle;
