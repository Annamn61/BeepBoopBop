import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        width: '100%',
        padding: 1,
        backgroundColor: '#dedede',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: '8px',
        alignItems: 'center',
        gap: 2,
    },
    text: {
        color: 'black'
    }
};
