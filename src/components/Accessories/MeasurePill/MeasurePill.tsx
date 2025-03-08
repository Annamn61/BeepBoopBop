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

interface MeasurePillProps {
  id: string;
  withModal: boolean;
}

const MeasurePill = ({ id, withModal }: MeasurePillProps) => {
  const measureColor = useUserStore.getState().getUserMeasureColorById(id);
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const backgroundColor = {
    backgroundColor: measureColor !== undefined ? measureColor : '#fff',
  };

  return withModal ? (
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
  ) : (
    <Box sx={{ ...styles.pill, ...backgroundColor }}>
      <Typography variant="overline">
        {getReadableId(parseUniqueId(id))}
      </Typography>
    </Box>
  );
};

export default MeasurePill;
