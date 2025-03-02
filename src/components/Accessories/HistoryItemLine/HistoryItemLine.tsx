import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  getShortFormatDateWithTime,
  getMMHHFromDate,
} from '../../../utils/time';
import { getMeasureId } from '../../../utils/measure';
import MeasurePill from '../MeasurePill/MeasurePill';
import { GenericUpdateItem, Measure } from '../../../types/MeasureTypes';
import { styles } from './HistoryItemLine.styles';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import useCommitteeAgendaStore from '../../../store/CommitteeAgendaStore';
import { shouldGetTestimonyLink } from './HistoryItemLine.helpers';
import TestimonyButtons from './TestimonyButtons/TestimonyButtons';
import MeetingButton from './MeetingButton/MeetingButton';
import { useMediaQuery, useTheme } from '@mui/material';

interface HistoryItemProps {
  updateItem: GenericUpdateItem;
  variant: 'full' | 'light';
}

export const HistoryItemLine = ({ updateItem, variant }: HistoryItemProps) => {
  const { getTestimonyLinkByIdAndDate, getCommitteeMeetingByIdAndDate } =
    useCommitteeAgendaStore();
  const theme = useTheme();

  const isDocument = updateItem?.Type === 'MeasureDocument';
  const isMeeting = updateItem?.Type === 'CommitteeMeeting';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('is mobile', isMobile);
  const id = getMeasureId(updateItem.MeasurePrefix, updateItem.MeasureNumber);
  const displayedTestimony = shouldGetTestimonyLink(updateItem)
    ? getTestimonyLinkByIdAndDate(id, new Date(updateItem.Date))
    : null;

  const committeeMeeting =
    isMeeting && getCommitteeMeetingByIdAndDate(id, new Date(updateItem.Date));

  if (!updateItem) {
    return null;
  }

  const documentLink =
    isDocument && updateItem.Link ? (
      <IconButton href={updateItem.Link} target="_blank" size="small">
        <DescriptionRoundedIcon fontSize="small" />
      </IconButton>
    ) : null;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.metaData}>
        <Typography variant="subtitle2" sx={styles.time}>
          {variant === 'full'
            ? getMMHHFromDate(new Date(updateItem.Date))
            : getShortFormatDateWithTime(new Date(updateItem.Date))}
        </Typography>
        {variant === 'full' && (
          <MeasurePill
            id={getMeasureId(
              updateItem.MeasurePrefix,
              updateItem.MeasureNumber
            )}
            withModal={true}
          />
        )}
      </Box>
      <Box sx={styles.content}>
        <Box sx={styles.topLine}>
          {variant === 'full' && (
            <Box sx={styles.caption}>
              <Typography variant="caption">
                {updateItem.MeasureName}
              </Typography>
            </Box>
          )}
          {isMobile && (
            <IconButton sx={styles.dropdownIcon} size="small">
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={styles.documentLine}>
          <Typography variant="body1">{updateItem.Text}</Typography>
          <Box sx={styles.buttonContainer}>
            {documentLink}
            {committeeMeeting && (
              <MeetingButton
                committeeMeeting={committeeMeeting}
                MeasureNumber={updateItem.MeasureNumber}
                MeasurePrefix={
                  updateItem.MeasurePrefix as Measure['MeasurePrefix']
                }
              />
            )}
            {displayedTestimony && (
              <TestimonyButtons testimonyLinks={displayedTestimony} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryItemLine;
