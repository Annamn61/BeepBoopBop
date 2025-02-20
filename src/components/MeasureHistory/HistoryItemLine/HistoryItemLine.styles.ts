import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex', 
        flexDirection: 'row',
        gap: 1,
    },
    time: { width: '70px', color: '#A7A7A7', flexShrink: 0 },
};
