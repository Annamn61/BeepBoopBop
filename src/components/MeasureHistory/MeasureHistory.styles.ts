import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    emptyObject: {
        marginTop: 4,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
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
};
