import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { CommitteeMeeting } from '../../../../types/CommitteeMeetingsTypes';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { Measure } from '../../../../types/MeasureTypes';
import { getTwoDigits } from '../../../../utils/time';

interface Props {
  committeeMeeting: CommitteeMeeting;
  MeasurePrefix: Measure['MeasurePrefix'];
  MeasureNumber: Measure['MeasureNumber'];
}

const MeetingButton = ({
  committeeMeeting,
  MeasurePrefix,
  MeasureNumber,
}: Props) => {
  const { SessionKey, CommitteeCode, MeetingDate } = committeeMeeting;

  const date = new Date(MeetingDate);

  const dateString = `${date.getFullYear()}-${getTwoDigits(
    date.getMonth() + 1
  )}-${getTwoDigits(date.getDate())}-${getTwoDigits(date.getHours())}-00`;

  const url = `https://olis.oregonlegislature.gov/liz/${SessionKey}/Committees/${CommitteeCode}/${dateString}/${MeasurePrefix}${MeasureNumber}/PUB/Details`;

  return (
    <Tooltip title="View Meeting in OLIS">
      <IconButton href={url} target="_blank">
        <EventNoteRoundedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MeetingButton;
