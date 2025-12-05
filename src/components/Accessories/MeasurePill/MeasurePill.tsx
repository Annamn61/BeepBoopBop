import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MeasureModal from '../MeasureModal/MeasureModal';
import { useModal } from '../../../utils/modal';
import Button from '@mui/material/Button';
import { styles } from './MeasurePill.styles';
import { TOOLTIP_MESSAGES } from '../../../utils/constants';
import Tooltip from '@mui/material/Tooltip';
import { useUserStore } from '../../../store/UserStore';
import { getReadableId, parseUniqueId } from '../../../utils/measure';
import { useNavigate } from 'react-router-dom';

interface MeasurePillProps {
  id: string;
  withModal: boolean;
  shouldNavigateToBillOnClick?: boolean;
}

const MeasurePill = ({
  id,
  withModal,
  shouldNavigateToBillOnClick = false,
}: MeasurePillProps) => {
  const measureColor = useUserStore.getState().getUserMeasureColorById(id);
  const { anchorEl, setModalOpen, setModalClosed } = useModal();
  const navigate = useNavigate();

  const backgroundColor = {
    backgroundColor: measureColor !== undefined ? measureColor : '#fff',
  };

  if (withModal) {
    return (
      <>
        <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
          <Button
            sx={{
              ...styles.pill,
              ...backgroundColor,
              ...(styles.pillHover as any),
            }}
            onClick={setModalOpen}
          >
            <Typography variant="overline">
              {getReadableId(parseUniqueId(id))}
            </Typography>
          </Button>
        </Tooltip>

        <MeasureModal
          measureId={id}
          anchorEl={anchorEl}
          onClose={setModalClosed}
        />
      </>
    );
  }

  if (shouldNavigateToBillOnClick) {
    return (
      <Tooltip title={TOOLTIP_MESSAGES.MeasureModal}>
        <Button
          sx={{
            ...styles.pill,
            ...backgroundColor,
            ...(styles.pillHover as any),
          }}
          onClick={() => navigate(`/bill/${id}`)}
        >
          <Typography variant="overline">
            {getReadableId(parseUniqueId(id))}
          </Typography>
        </Button>
      </Tooltip>
    );
  }

  return (
    <Box sx={{ ...styles.pill, ...backgroundColor }}>
      <Typography variant="overline">
        {getReadableId(parseUniqueId(id))}
      </Typography>
    </Box>
  );
};

export default MeasurePill;
