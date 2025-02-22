import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    divider: {
        width: '100%',
        height: '2px',
        borderRadius: '4px',
        backgroundColor:'#E0E0E0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2, 
        alignItems: 'flex-start'
    }
};
