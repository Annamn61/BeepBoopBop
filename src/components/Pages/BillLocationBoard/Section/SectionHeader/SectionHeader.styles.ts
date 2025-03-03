import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    count: {
        padding: '0px 8px',
        backgroundColor: 'white',
        borderRadius: '4px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        alignItems: 'center'
    }
};
