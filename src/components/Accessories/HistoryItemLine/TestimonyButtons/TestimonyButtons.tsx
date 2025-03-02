import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import InterpreterModeRoundedIcon from '@mui/icons-material/InterpreterModeRounded';
import { TestimonyLinks } from '../../../../types/CommitteeAgendaTypes';

interface Props {
  testimonyLinks: TestimonyLinks;
}

const TestimonyButtons = ({ testimonyLinks }: Props) => {
  return (
    <>
      <Tooltip title={'Register to Testify Live'}>
        <IconButton size="small" href={testimonyLinks.inPerson} target="_blank">
          <InterpreterModeRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Submit Written Testimony'}>
        <IconButton size="small" href={testimonyLinks.written} target="_blank">
          <CommentRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TestimonyButtons;
