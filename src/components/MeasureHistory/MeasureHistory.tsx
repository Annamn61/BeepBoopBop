import useHistoryStore from '../../store/HistoryStore';
import DateTitle from './DateTitle/DateTitle';
import Box from '@mui/material/Box';
import EmptyObject from '../Accessories/EmptyObject/EmptyObject';
import { MeasureHistoryItem } from '../../types/MeasureTypes';
import { styles } from './MeasureHistory.styles';
import HistoryItemLine from '../Accessories/HistoryItemLine/HistoryItemLine';

export const MeasureHistory = () => {
  const { getFilteredHistorySortedByDate } = useHistoryStore();

  const history = getFilteredHistorySortedByDate();

  if (!Object.keys(history).length) {
    return (
      <EmptyObject
        message="Nothing to see here... yet! 🌱"
        subtitle="Start tracking bills to see where they have been."
        sx={styles.emptyObject}
      />
    );
  }

  return (
    <Box sx={styles.container}>
      {Object.entries(history).map(([dateString, actions]) => (
        <Box sx={styles.dateSection} key={dateString}>
          <DateTitle dateString={dateString} />
          <Box sx={styles.item}>
            {actions.map((action: MeasureHistoryItem) => (
              <HistoryItemLine
                key={action.MeasureHistoryId}
                historyItem={action}
                variant="full"
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
