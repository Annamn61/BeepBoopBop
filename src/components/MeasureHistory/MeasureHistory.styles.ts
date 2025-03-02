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
        flexDirection: {
            xs: 'column',
            sm: 'row',
        },
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: {
            xs: 1,
            sm: 'unset',
        }
    },
    buttonGroup: {
        width: {
            xs: '100%',
            sm: 'fit-content',
        },
        display: 'flex',
    },
    buttonInGroup: {
        flexGrow: 1,
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
        gap: {
            xs: 3,
            sm: 2,
        },
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
