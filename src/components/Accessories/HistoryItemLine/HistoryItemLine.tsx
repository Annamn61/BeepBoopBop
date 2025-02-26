import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  getShortFormatDateWithTime,
  getMMHHFromDate,
} from '../../../utils/time';
import { getMeasureId } from '../../../utils/measure';
import MeasurePill from '../../Measure/MeasurePill/MeasurePill';
import { GenericUpdateItem } from '../../../types/MeasureTypes';
import { styles } from './HistoryItemLine.styles';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { IconButton } from '@mui/material';

interface HistoryItemProps {
  updateItem: GenericUpdateItem;
  variant: 'full' | 'light';
}

export const HistoryItemLine = ({ updateItem, variant }: HistoryItemProps) => {
  const isDocument = updateItem?.Type === 'MeasureDocument';

  if (!updateItem) {
    return null;
  }

  const documentLink =
    isDocument && updateItem.Link ? (
      <IconButton href={updateItem.Link} target="_blank" size="small">
        <DescriptionRoundedIcon />
      </IconButton>
    ) : null;

  if (variant === 'full') {
    return (
      <Box sx={styles.container}>
        <Typography variant="subtitle2" sx={styles.time}>
          {getMMHHFromDate(new Date(updateItem.Date))}
        </Typography>
        <MeasurePill
          id={getMeasureId(updateItem.MeasurePrefix, updateItem.MeasureNumber)}
          withModal={true}
        />
        <Typography variant="body1">{updateItem.Text}</Typography>
        {documentLink}
      </Box>
    );
  } else {
    return (
      <Box sx={styles.container}>
        <Typography variant="body2" sx={styles.longTime}>
          {getShortFormatDateWithTime(new Date(updateItem.Date))}
        </Typography>
        <Typography variant="body1">{updateItem.Text}</Typography>
        {documentLink}
      </Box>
    );
  }
};

export default HistoryItemLine;
