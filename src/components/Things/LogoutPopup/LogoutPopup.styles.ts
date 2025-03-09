import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        justifyContent: 'flex-end'
    }
};
