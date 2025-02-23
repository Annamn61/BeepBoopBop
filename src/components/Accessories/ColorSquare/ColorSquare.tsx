import Box from '@mui/material/Box';
import { styles } from './ColorSquare.styles';

interface ColorSquareProps {
  color: string | undefined;
  filled?: boolean;
}

const ColorSquare = ({ color = '#fff', filled = true }: ColorSquareProps) => {
  const bgColor = {
    backgroundColor: filled ? color : 'transparent',
    border: `2px solid ${color}`,
  };

  return <Box sx={{ ...styles.square, ...bgColor }} />;
};

export default ColorSquare;
