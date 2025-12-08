import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        padding: 3,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-end',
    },
    title: {
        width: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2
    },
    billNumber: {
        width: '140px'
    },
    sessionKey: {
        width: '100%'
    },
    color: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0px 16px',
        backgroundColor: '#EFEFEF',
        gap: 2,
        alignItems: 'center',
        borderRadius: '8px',
        position: 'relative',
    },
};

