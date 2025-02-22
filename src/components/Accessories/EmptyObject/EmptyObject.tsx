import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { styles } from './EmptyObject.styles';

interface Props {
  message: string;
  subtitle: string;
  sx?: SxProps<Theme>;
}

const EmptyObject = ({ message, subtitle, sx }: Props) => {
  return (
    <Box sx={{ ...styles.container, ...(sx as any) }}>
      <Typography variant="h3">{message}</Typography>
      <Typography variant="body2">{subtitle}</Typography>
    </Box>
  );
};

export default EmptyObject;
