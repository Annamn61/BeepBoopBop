import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    pill: {
        padding: '0px 16px',
        borderRadius: '16px',
        minWidth: '110px',
        width: 'fit-content',
        boxSizing: 'border-box',
        textAlign: 'center',
        height: 'fit-content',
        flexShrink: 0,
        flexWrap: 'nowrap',
    },
    pillHover: {
        '&:hover': {
            filter: 'brightness(80%)',
        }
    }
};
