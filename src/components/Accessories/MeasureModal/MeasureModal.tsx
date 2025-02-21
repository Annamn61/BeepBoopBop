import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { styles } from './MeasureModal.styles';
import Typography from '@mui/material/Typography';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useMeasureStore from '../../../store/MeasureStore';
import Link from '@mui/material/Link';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  measureId: string | undefined;
}

const MeasureModal = ({ anchorEl, onClose, measureId }: Props) => {
  const { getMeasureById } = useMeasureStore();
  const measure = getMeasureById(measureId);

  if (!measureId || !measure) {
    return null;
  }

  const { RelatingTo, CatchLine, MeasureDocuments, CurrentLocation } = measure;
  console.log('Measure Docs', MeasureDocuments);

  return (
    <Dialog maxWidth="lg" open={!!anchorEl} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.header}>
          <Button>View in OLIS</Button>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={styles.modalContent}>
          <MeasurePill id={measureId} />
          <Typography variant="h1" sx={styles.title}>
            {CatchLine}
          </Typography>
          <Box sx={styles.measureDocumentSection}>
            <Typography variant="subtitle2">Measure Documents</Typography>
            <Box sx={styles.documentsContainer}>
              {MeasureDocuments.map((doc) => (
                <Link
                  role="button"
                  sx={styles.measureDocument}
                  href={doc.DocumentUrl}
                  target="_blank"
                >
                  <Typography variant="body1">
                    {doc.VersionDescription}
                  </Typography>
                  <LaunchRoundedIcon sx={styles.launchIcon} fontSize="small" />
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={styles.quicklook}>
            <Typography variant="h3">Quicklook</Typography>
          </Box>
          <Box sx={styles.summary}>
            <Typography variant="h3">Summary</Typography>
            <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Catchline</Typography>
              <Typography variant="body1">{CatchLine}</Typography>
            </Box>
            <Box sx={styles.lineItem}>
              <Typography variant="subtitle1">Location</Typography>
              <Typography variant="body1">{CurrentLocation}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MeasureModal;
