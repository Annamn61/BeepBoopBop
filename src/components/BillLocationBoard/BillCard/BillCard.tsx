import Button from '@mui/material/Button';
import useMeasureStore from '../../../store/MeasureStore';
import MeasureModal from '../../Accessories/MeasureModal/MeasureModal';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../utils/modal';
import Box from '@mui/material/Box';
import { styles } from './BillCard.styles';
import { globalStyles } from '../../../utils/styleHelpers';

interface BillProps {
  billId: string;
}

const Bill = ({ billId }: BillProps) => {
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const committeeCode = useMeasureStore
    .getState()
    .getMeasureCommitteeCodeById(billId);
  const position = useMeasureStore
    .getState()
    .getUserTrackedMeasurePositionById(billId);
  const billTitle = useMeasureStore.getState().getMeasureTitleById(billId);
  const measureColor = useMeasureStore
    .getState()
    .getUserMeasureColorById(billId);

  const colorStyles = {
    borderLeft: `8px solid ${measureColor}`,
  };

  return (
    <>
      <Button
        sx={{
          ...colorStyles,
          ...styles.billCard,
        }}
        onClick={setModalOpen}
        key={billId}
      >
        <Typography variant="body1" sx={{ ...globalStyles.twoLineEllipses }}>
          {billTitle}
        </Typography>
        {committeeCode && (
          <Typography variant="body2" sx={styles.committeeCode}>
            {committeeCode}
          </Typography>
        )}
        <Box sx={styles.info}>
          <Box>{position === 'Support' ? '🌍' : '🚨'}</Box>
          <Typography variant="h5">{billId}</Typography>
        </Box>
      </Button>
      <MeasureModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        measureId={billId}
      />
    </>
  );
};

export default Bill;
