import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    input: {
        borderRadius: '100px',
        overflow: 'hidden',
        '& fieldset': {
            borderRadius: '100px',
            overflow: 'hidden',
        },
        '& input': {
            backgroundColor: '#fff',
            border: '2px solid #EDEDED',
            borderRadius: '100px',
            height: '40px',
            padding: '0px 16px',
            boxSizing: 'border-box',
        }
    },
};
