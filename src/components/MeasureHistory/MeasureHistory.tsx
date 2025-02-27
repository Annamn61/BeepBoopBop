import useHistoryStore from '../../store/HistoryStore';
import DateTitle from './DateTitle/DateTitle';
import Box from '@mui/material/Box';
import EmptyObject from '../Accessories/EmptyObject/EmptyObject';
import { GenericUpdateItem } from '../../types/MeasureTypes';
import { styles } from './MeasureHistory.styles';
import HistoryItemLine from '../Accessories/HistoryItemLine/HistoryItemLine';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import {
  getFutureHistoryFromHistory,
  getPastHistoryFromHistory,
} from './MeasureHistory.helpers';

export const MeasureHistory = () => {
  const { getFilteredUpdatesSortedByDate } = useHistoryStore();

  const history = getFilteredUpdatesSortedByDate();
  const futureHistory = useMemo(
    () => getFutureHistoryFromHistory(history),
    [history]
  );
  const pastHistory = useMemo(
    () => getPastHistoryFromHistory(history),
    [history]
  );

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
      <Box sx={{ ...styles.dateSectionContainer, ...(styles.future as any) }}>
        <Typography variant="h4">Upcoming</Typography>
        {Object.entries(futureHistory)
          .reverse()
          .map(([dateString, updates]) => (
            <Box sx={styles.dateSection} key={dateString}>
              <DateTitle dateString={dateString} />
              <Box sx={styles.items}>
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
        {Object.entries(pastHistory).map(([dateString, updates]) => (
          <Box sx={styles.dateSection} key={dateString}>
            <DateTitle dateString={dateString} />
            <Box sx={styles.items}>
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
