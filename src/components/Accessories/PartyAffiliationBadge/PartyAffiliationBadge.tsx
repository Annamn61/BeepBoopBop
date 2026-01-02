import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styles } from './PartyAffiliationBadge.styles';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  isCircleBadge?: boolean;
  parties: string[];
}

const getColorForParty = (party: string) => {
  switch (party) {
    case 'Democrat':
      return 'blue';
    case 'Republican':
      return 'red';
    default:
      return '#000';
  }
};

const PartyAffiliationBadge = ({ isCircleBadge = false, parties }: Props) => {
  if (parties.length === 0) {
    return <Box sx={styles.container(isCircleBadge, undefined)}></Box>;
  }

  // For circle badges, only show the first party
  const partiesToShow = isCircleBadge ? [parties[0]] : parties;
  const tooltipTitle = isCircleBadge
    ? parties[0]
    : `Sponsoring party or parties: ${parties.join(', ')}`;

  return (
    <Tooltip title={tooltipTitle}>
      <Box
        sx={styles.container(
          isCircleBadge,
          isCircleBadge ? getColorForParty(parties[0]) : undefined
        )}
      >
        {partiesToShow.map((party) => (
          <Typography
            variant="caption"
            sx={styles.letter(isCircleBadge, getColorForParty(party))}
            key={party}
          >
            {party.charAt(0)}
          </Typography>
        ))}
      </Box>
    </Tooltip>
  );
};

export default PartyAffiliationBadge;
