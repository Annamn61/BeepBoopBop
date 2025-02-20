import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMeasureStore from '../../../store/MeasureStore';

interface MeasurePillProps {
  id: string;
}

const MeasurePill = ({ id }: MeasurePillProps) => {
  const measureColor = useMeasureStore.getState().getUserMeasureColorById(id);

  return (
    <Box
      sx={{
        backgroundColor: measureColor,
        padding: '0px 16px',
        borderRadius: '16px',
        width: '70px',
        textAlign: 'center',
        height: 'fit-content',
        flexShrink: 0,
      }}
    >
      <Typography variant="overline">{id}</Typography>
    </Box>
  );
};

export default MeasurePill;
