import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    emptyObject: {
        marginTop: 4,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    dateSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }, 
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }, 
    dateSectionContainer: {
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        borderRadius: '8px',
    },
    future: {
        backgroundColor: '#f7f7f7'
    }
};
