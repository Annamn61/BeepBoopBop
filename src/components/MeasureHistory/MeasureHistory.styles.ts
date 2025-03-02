import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    emptyObject: {
        marginTop: 4,
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
    items: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    }, 
    dateSectionContainer: {
        padding: {
            xs: 2,
            md: 4,
        },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        borderRadius: '8px',
    },
    future: {
        backgroundColor: '#f7f7f7'
    }
};
