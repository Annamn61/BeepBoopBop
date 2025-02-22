import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import useHistoryStore from '../../store/HistoryStore';
import DateTitle from './DateTitle/DateTitle';
import HistoryItemLine from './HistoryItemLine/HistoryItemLine';
import Box from '@mui/material/Box';

export const MeasureHistory = () => {
  const { getFilteredHistorySortedByDate, unfilteredHistory } =
    useHistoryStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Object.entries(getFilteredHistorySortedByDate()).map(
        ([dateString, actions]) => {
          console.log('history', unfilteredHistory);
          return (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              key={dateString}
            >
              <DateTitle dateString={dateString} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {actions.map(
                  (action: {
                    MeasureHistoryId: Key | null | undefined;
                    ActionDate: string | number | Date;
                    ActionText:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <HistoryItemLine
                      key={action.MeasureHistoryId}
                      action={action}
                    />
                  )
                )}
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
};
