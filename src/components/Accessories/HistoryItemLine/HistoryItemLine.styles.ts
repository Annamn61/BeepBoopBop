import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex', 
        flexDirection: 'row',
        gap: 2,
    },
    time: { minWidth: '65px', flexShrink: 0 },
    longTime: { width: '150px', flexShrink: 0},
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    documentLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1.5,
    }
};
