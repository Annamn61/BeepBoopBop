import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    modalContainer: {
        width: '900px',
        boxSizing: 'border-box',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    superHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },
    divider: {
        width: '100%',
        height: '2px',
        borderRadius: '4px',
        backgroundColor:'#E0E0E0',
    },
    agendaItemContainer:  {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    }
};
