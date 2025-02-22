import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'flex-start'
    },
    divider: {
        height: '3px',
        width: '100%',
        borderRadius: '4px',
        backgroundColor: 'darkgreen',
    }
};
