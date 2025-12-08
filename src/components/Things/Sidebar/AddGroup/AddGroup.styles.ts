import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: '300px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 600,
    },
    joinButton: {
        alignSelf: 'flex-end',
    },
};

