import useHistoryStore from '../../store/HistoryStore';
import DateTitle from './DateTitle/DateTitle';
import Box from '@mui/material/Box';
import EmptyObject from '../Accessories/EmptyObject/EmptyObject';
import { GenericUpdateItem } from '../../types/MeasureTypes';
import { styles } from './MeasureHistory.styles';
import HistoryItemLine from '../Accessories/HistoryItemLine/HistoryItemLine';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import {
  getFutureHistoryFromHistory,
  getPastHistoryFromHistory,
} from './MeasureHistory.helpers';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { importantDates } from '../../data/ImportantLegistlativeDates';
import Deadline from './Deadline/Deadline';

export const MeasureHistory = () => {
  const {
    getFilteredUpdatesSortedByDate,
    getFilteredLatestUpdatesOnlyByDate,
    getFilteredUpdatesLength,
    getFilteredLatestUpdatesLength,
  } = useHistoryStore();

  const [filterToggle, setFilterToggle] = useState('all');
  const history = useMemo(() => {
    return filterToggle === 'all'
      ? getFilteredUpdatesSortedByDate()
      : getFilteredLatestUpdatesOnlyByDate();
  }, [filterToggle]);
  const length = useMemo(() => {
    return filterToggle === 'all'
      ? getFilteredUpdatesLength()
      : getFilteredLatestUpdatesLength();
  }, [filterToggle]);

  const futureHistory = useMemo(
    () => getFutureHistoryFromHistory(history),
    [history]
  );
  const pastHistory = useMemo(
    () => getPastHistoryFromHistory(history),
    [history]
  );

  const futureHistoryKeysSorted = useMemo(() => {
    return Object.keys(futureHistory).sort();
  }, [futureHistory]);

  if (!Object.keys(history).length) {
    return (
      <EmptyObject
        message="Nothing to see here... yet! 🌱"
        subtitle="Start tracking bills to see where they have been."
        sx={styles.emptyObject}
      />
    );
  }

  console.log(
    'FUTURE',
    futureHistory,
    Object.entries(futureHistory),
    '-',
    Object.entries(futureHistory).reverse(),
    Object.keys(futureHistory)
  );

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.header}>
        <ToggleButtonGroup
          value={filterToggle}
          exclusive
          onChange={(_e, mode) => setFilterToggle(mode)}
          aria-label="update mode"
        >
          <ToggleButton value="all">All Updates</ToggleButton>
          <ToggleButton value="last">Last Update Only</ToggleButton>
        </ToggleButtonGroup>
        <Typography>{length} items</Typography>
      </Box>
      <Box sx={styles.container}>
        <Box sx={{ ...styles.dateSectionContainer, ...(styles.future as any) }}>
          <Typography variant="h4">Upcoming</Typography>
          {futureHistoryKeysSorted.map((key) => (
            <Box sx={styles.dateSection} key={key}>
              <DateTitle dateString={key} />
              <Box sx={styles.items}>
                {Object.keys(importantDates).includes(key) && (
                  <Deadline dateKey={key} />
                )}

                {futureHistory[key].map((update: GenericUpdateItem) => (
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
    </Box>
  );
};
