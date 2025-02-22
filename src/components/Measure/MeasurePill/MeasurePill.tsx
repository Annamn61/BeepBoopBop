import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMeasureStore from '../../../store/MeasureStore';
import MeasureModal from '../../Accessories/MeasureModal/MeasureModal';
import { useModal } from '../../../utils/modal';
import Button from '@mui/material/Button';
import { styles } from './MeasurePill.styles';

interface MeasurePillProps {
  id: string;
  withModal: boolean;
}

const MeasurePill = ({ id, withModal }: MeasurePillProps) => {
  const measureColor = useMeasureStore.getState().getUserMeasureColorById(id);
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const backgroundColor = {
    backgroundColor: measureColor !== undefined ? measureColor : '#fff',
  };

  return withModal ? (
    <>
      <Button
        sx={{ ...styles.pill, ...backgroundColor }}
        onClick={setModalOpen}
      >
        <Typography variant="overline">{id}</Typography>
      </Button>
      <MeasureModal
        measureId={id}
        anchorEl={anchorEl}
        onClose={setModalClosed}
      />
    </>
  ) : (
    <Box sx={{ ...styles.pill, ...backgroundColor }}>
      <Typography variant="overline">{id}</Typography>
    </Box>
  );
};

export default MeasurePill;
