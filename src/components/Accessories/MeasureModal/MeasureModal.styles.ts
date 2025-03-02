import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    modalContainer: {
        width: '900px',
        boxSizing: 'border-box',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        overflow: 'auto'
    },
    title: {
        fontWeight: 600,
    }, 
    infoSection: {
        gap: 3,
        display: 'flex',
        flexDirection: 'column'
    },
    quicklook: {
        backgroundColor: '#E5EFE5',
        border: '2px solid darkgreen',
        borderRadius: '8px',
        padding: 2,
    },
    history: {
        padding: 3,
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
    },
    historyItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    measureDocument: {
        padding: '8px 16px',
        backgroundColor: '#EFEFEF',
        width: 'fit-content',
        borderRadius: '4px',
        color: 'black',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#D9D9D9',
            color: 'black',
        }
    },
    measureDocumentSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },
    documentsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    lineItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        '& *:first-child': {
            minWidth: '100px',
        },
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 1,
    }
};
