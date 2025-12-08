import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    groupContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        width: '100%',
        marginTop: 2,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '20px',
        alignItems: 'center',
    },
};

