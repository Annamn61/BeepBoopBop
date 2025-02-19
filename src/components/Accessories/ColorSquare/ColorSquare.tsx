import Box from '@mui/material/Box';

interface ColorSquareProps {
  color: string;
}

const ColorSquare = ({ color }: ColorSquareProps) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        width: '20px',
        height: '20px',
        borderRadius: '4px',
      }}
    />
  );
};

export default ColorSquare;
