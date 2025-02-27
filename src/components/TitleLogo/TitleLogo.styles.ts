import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    subtitle: {
        color: '#797979',
        marginBottom: '-8px',
    },
    title: {
        fontSize: '1.9rem',
        color: '#3E753B',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        alignItems: 'center'
    },
    logo: {
        height: '44px',
    }
};
