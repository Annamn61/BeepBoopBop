import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    billCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: '6px',
        padding: 1.5,
        gap: 1.5,
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '2px 2px 4px 0px rgba(127, 127, 132, 0.2)',
        '&:hover, :focus' : {
          backgroundColor: '#ededed',
          boxShadow: '2px 2px 4px 0px rgba(127, 127, 132, 0.4)',
        },
    },
    committeeCode: {
        backgroundColor: '#f7f7f7',
        padding: '0px 12px',
        borderRadius: '2px',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
    }
};
