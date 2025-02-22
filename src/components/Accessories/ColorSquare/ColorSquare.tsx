import Box from '@mui/material/Box';
import { styles } from './ColorSquare.styles';

interface ColorSquareProps {
  color: string;
}

const ColorSquare = ({ color }: ColorSquareProps) => {
  const bgColor = {
    backgroundColor: color,
  };

  return <Box sx={{ ...styles.square, ...bgColor }} />;
};

export default ColorSquare;
