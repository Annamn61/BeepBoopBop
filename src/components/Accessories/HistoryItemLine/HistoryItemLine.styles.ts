import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex', 
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center'
    },
    time: { width: '70px', flexShrink: 0 },
    longTime: { width: '150px', flexShrink: 0}
};
