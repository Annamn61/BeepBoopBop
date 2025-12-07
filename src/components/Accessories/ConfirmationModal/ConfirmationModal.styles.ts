import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        gap: 2,
    }
};
