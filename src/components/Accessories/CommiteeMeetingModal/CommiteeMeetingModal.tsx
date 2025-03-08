import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import useCommitteeAgendaStore from '../../../store/CommitteeAgendaStore';
import { styles } from './CommiteeMeetingModal.styles';
import Typography from '@mui/material/Typography';
import { getShortFormatDateWithTime } from '../../../utils/time';
import MeasurePill from '../MeasurePill/MeasurePill';
import ViewInOlisButton from '../ViewInOlisButton/ViewInOlisButton';
import { getCommitteeMeetingURL } from '../../../utils/CommitteeMeeting';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getMeasureUniqueId } from '../../../utils/measure';

interface Props {
  open: boolean;
  onClose: () => void;
  committeeMeetingId: string;
}

const CommiteeMeetingModal = ({ open, onClose, committeeMeetingId }: Props) => {
  const { getCommitteeMeetingWithItemsByGuid } = useCommitteeAgendaStore();

  const meetingObject = getCommitteeMeetingWithItemsByGuid(committeeMeetingId);

  if (!meetingObject) {
    return null;
  }

  const { CommitteeMeeting, AgendaItems } = meetingObject;

  return (
    <Dialog maxWidth="lg" open={!!open} onClose={onClose}>
      <Box sx={styles.modalContainer}>
        <Box sx={styles.superHeader}>
          <ViewInOlisButton url={getCommitteeMeetingURL(CommitteeMeeting)} />
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={styles.header}>
          <Typography variant="h1">{CommitteeMeeting.CommitteeCode}</Typography>
          <Typography variant="subtitle2">
            {getShortFormatDateWithTime(new Date(CommitteeMeeting.MeetingDate))}
          </Typography>
        </Box>
        <Typography variant="h3">My Tracked Measures</Typography>
        <Box sx={styles.divider} />
        {AgendaItems.map((item) => (
          <Box sx={styles.agendaItemContainer}>
            <MeasurePill id={getMeasureUniqueId(item)} withModal={true} />
            <Typography>{item.MeetingType}</Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
};

export default CommiteeMeetingModal;
