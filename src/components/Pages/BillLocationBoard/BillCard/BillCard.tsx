import Button from '@mui/material/Button';
import useMeasureStore from '../../../../store/MeasureStore';
import MeasureModal from '../../../Accessories/MeasureModal/MeasureModal';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../../utils/modal';
import Box from '@mui/material/Box';
import { styles } from './BillCard.styles';
import { globalStyles } from '../../../../utils/styleHelpers';
import { TOOLTIP_MESSAGES } from '../../../../utils/constants';
import Tooltip from '@mui/material/Tooltip';
import { useUserStore } from '../../../../store/UserStore';
import { getReadableId, parseUniqueId } from '../../../../utils/measure';

interface BillProps {
  billId: string;
}

const Bill = ({ billId }: BillProps) => {
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const {
    getMeasureCommitteeCodeById,
    getMeasureTitleById,
    getMeasureNicknameById,
  } = useMeasureStore();
  const { getUserTrackedMeasurePositionById, getUserMeasureColorById } =
    useUserStore();

  const committeeCode = getMeasureCommitteeCodeById(billId);
  const position = getUserTrackedMeasurePositionById(billId);
  const billTitle = getMeasureTitleById(billId);
  const nickname = getMeasureNicknameById(billId);
  const displayTitle = nickname || billTitle;
  const measureColor = getUserMeasureColorById(billId) || '#9E9E9E'; // Default darker grey for untracked bills

  const colorStyles = {
    borderLeft: `8px solid ${measureColor}`,
  };

  return (
    <>
      <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
        <Button
          sx={{
            ...colorStyles,
            ...styles.billCard,
          }}
          onClick={setModalOpen}
          key={billId}
        >
          <Typography variant="body1" sx={{ ...globalStyles.twoLineEllipses }}>
            {displayTitle}
          </Typography>
          {committeeCode && (
            <Typography variant="body2" sx={styles.committeeCode}>
              {committeeCode}
            </Typography>
          )}
          <Box sx={styles.info}>
            <Box>
              {position === 'Support' && <span>🌍</span>}
              {position === 'Oppose' && '🚨'}
            </Box>
            <Typography variant="h5">
              {getReadableId(parseUniqueId(billId))}
            </Typography>
          </Box>
        </Button>
      </Tooltip>
      <MeasureModal
        anchorEl={anchorEl}
        onClose={setModalClosed}
        measureId={billId}
      />
    </>
  );
};

export default Bill;
