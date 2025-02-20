import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start'
    },
    dateAndDaysAgo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      date: {
        color: 'darkgreen',
        fontWeight: 600,
      },
      daysAgo: { color: '#a7a7a7' },
      divider: {
        width: '100%',
        height: '2px',
        borderRadius: '4px',
        backgroundColor:'#E0E0E0',
      }
};
