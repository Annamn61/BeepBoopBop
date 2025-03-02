import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex', 
        flexDirection: 'row',
        gap: 2,
    },
    time: { minWidth: '65px', flexShrink: 0 },
    longTime: { width: '150px', flexShrink: 0},
    contentContainer: {
        display: 'flex',
           flexDirection: {
            xs: 'column',
            sm: 'row',
        },
        width: '100%',
       gap: {
        xs: 0, 
        sm: 2, 
       }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    topLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '34px',
    },
    documentLine: {
        display: 'flex',
        minHeight: '34px',
        flexDirection: {
            xs: 'column',
            sm: 'row',
        },
        alignItems: {
            xs: 'flex-start',
            sm: 'center'
        },
        gap: 1.5,
    },
    buttonContainer: {
        flexDirection: 'row',
        display: {
            xs: 'none',
            sm: 'flex',
        }
    }
};
