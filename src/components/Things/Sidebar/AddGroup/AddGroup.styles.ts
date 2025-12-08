import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: '300px',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minHeight: '200px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 600,
    },
    select: {
        minWidth: '200px',
    },
    joinButton: {
        alignSelf: 'flex-end',
    },
};

