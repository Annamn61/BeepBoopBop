import useHistoryStore from '../../store/HistoryStore';
import DateTitle from './DateTitle/DateTitle';
import Box from '@mui/material/Box';
import EmptyObject from '../Accessories/EmptyObject/EmptyObject';
import { GenericUpdateItem } from '../../types/MeasureTypes';
import { styles } from './MeasureHistory.styles';
import HistoryItemLine from '../Accessories/HistoryItemLine/HistoryItemLine';
import Typography from '@mui/material/Typography';

export const MeasureHistory = () => {
  const { getFilteredUpdatesSortedByDate } = useHistoryStore();

  const history = getFilteredUpdatesSortedByDate();

  if (!Object.keys(history).length) {
    return (
      <EmptyObject
        message="Nothing to see here... yet! 🌱"
        subtitle="Start tracking bills to see where they have been."
        sx={styles.emptyObject}
      />
    );
  }

  const futureHistory = Object.entries(history).filter(
    ([dateString]) => new Date(dateString) > new Date()
  );

  const pastHistory = Object.entries(history).filter(([dateString]) => {
    console.log('===', dateString, new Date());
    return new Date(dateString) <= new Date();
  });

  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.dateSectionContainer, ...(styles.future as any) }}>
        <Typography variant="h4">Upcoming</Typography>
        {futureHistory.reverse().map(([dateString, updates]) => (
          <Box sx={styles.dateSection} key={dateString}>
            <DateTitle dateString={dateString} />
            <Box sx={styles.item}>
              {updates.map((update: GenericUpdateItem) => (
                <HistoryItemLine
                  key={update.Key}
                  updateItem={update}
                  variant="full"
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={styles.dateSectionContainer}>
        <Typography variant="h4">Past</Typography>
        {pastHistory.map(([dateString, updates]) => (
          <Box sx={styles.dateSection} key={dateString}>
            <DateTitle dateString={dateString} />
            <Box sx={styles.item}>
              {updates.map((update: GenericUpdateItem) => (
                <HistoryItemLine
                  key={update.Key}
                  updateItem={update}
                  variant="full"
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
