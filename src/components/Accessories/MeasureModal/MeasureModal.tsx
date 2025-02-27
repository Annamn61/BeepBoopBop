import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { styles } from './MeasureModal.styles';
import Typography from '@mui/material/Typography';
import MeasurePill from '../MeasurePill/MeasurePill';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useMeasureStore from '../../../store/MeasureStore';
import Link from '@mui/material/Link';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useHistoryStore from '../../../store/HistoryStore';
import HistoryItemLine from '../HistoryItemLine/HistoryItemLine';
import useCommitteeAgendaStore from '../../../store/CommitteeAgendaStore';
import { getShortFormatDateWithTime } from '../../../utils/time';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  measureId: string | undefined;
}

const MeasureModal = ({ anchorEl, onClose, measureId }: Props) => {
  const {
    getMeasureById,
    getMeasureUrlById,
    getSortedMeasureSponsorsById,
    getSortedMeasureChiefSponsorsById,
  } = useMeasureStore();
  const { getUpdatesById } = useHistoryStore();
  const { getUpcomingAgendaItemsById } = useCommitteeAgendaStore();
  const measure = getMeasureById(measureId);
  const agendaItems = getUpcomingAgendaItemsById(measureId);
  const sponsors = getSortedMeasureSponsorsById(measureId);
  const chiefSponsors = getSortedMeasureChiefSponsorsById(measureId);

  if (!measureId || !measure) {
    return null;
  }

  const { RelatingTo, CatchLine, MeasureDocuments, CurrentLocation } = measure;

  return (
    <Dialog maxWidth="lg" open={!!anchorEl} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.header}>
          <Button
            variant="outlined"
            href={getMeasureUrlById(measureId)}
            target="_blank"
          >
            View in OLIS
            <LaunchRoundedIcon sx={styles.launchIcon} fontSize="small" />
          </Button>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={styles.modalContent}>
          <MeasurePill id={measureId} withModal={false} />
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
                  key={doc.DocumentUrl}
                >
                  <Typography variant="body1">
                    {doc.VersionDescription}
                  </Typography>
                  <LaunchRoundedIcon sx={styles.launchIcon} fontSize="small" />
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={{ ...styles.quicklook, ...(styles.infoSection as any) }}>
            <Typography variant="h3">Quicklook</Typography>
          </Box>
          <Box sx={styles.infoSection}>
            <Typography variant="h3">Summary</Typography>
            {/* <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Catchline</Typography>
              <Typography variant="body1">{CatchLine}</Typography>
            </Box> */}
            <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Relating to</Typography>
              <Typography variant="body1">{RelatingTo}</Typography>
            </Box>
            <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Location</Typography>
              <Typography variant="body1">{CurrentLocation}</Typography>
            </Box>
            <Box sx={styles.lineItem}>
              <Typography sx={{ maxWidth: '100px' }} variant="subtitle2">
                Chief Sponsors
              </Typography>
              <Typography variant="body1">
                {chiefSponsors.map((s) => s.LegislatoreCode + ', ')}
              </Typography>
            </Box>
            <Box sx={styles.lineItem}>
              <Typography variant="subtitle2">Sponsors</Typography>
              <Typography variant="body1">
                {sponsors.map((s) => s.LegislatoreCode + ', ')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ ...styles.history, ...(styles.infoSection as any) }}>
            <Typography variant="h3">History</Typography>
            <Box sx={styles.historyItemsContainer}>
              {getUpdatesById(measureId).map((updateItem) => (
                <HistoryItemLine
                  key={updateItem.Key}
                  updateItem={updateItem}
                  variant="light"
                />
              ))}
            </Box>
          </Box>
          <Box sx={styles.infoSection}>
            <Typography variant="h3">Upcoming Events</Typography>
            {!!agendaItems.length ? (
              agendaItems.map((item) => (
                <Box sx={styles.lineItem} key={item.CommitteeAgendaItemId}>
                  <Typography variant="subtitle2">
                    {getShortFormatDateWithTime(new Date(item.MeetingDate))}
                  </Typography>
                  <Typography variant="body1">{item.MeetingType}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="subtitle2">No Upcoming Events</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MeasureModal;
