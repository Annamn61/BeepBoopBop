import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex', 
        flexDirection: 'row',
        gap: 2,
    },
    metaData: {
        display: 'flex',
        flexDirection: {
            xs: 'column-reverse',
            md: 'row'
        },
        gap: {
            xs: 0.5,
            md: 2,
        },
        alignItems: {
            xs: 'flex-end',
            md: 'flex-start'
        },
        justifyContent: {
            xs: 'flex-end'
        }
    },
    time: { minWidth: '65px', flexShrink: 0 },
    longTime: { width: '150px', flexShrink: 0},
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    topLine: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    caption: {
        minHeight: '34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dropdownIcon: {
        // height: '24px',
    },
    documentLine: {
        display: 'flex',
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
        display: 'flex',
        flexDirection: 'row',
    }
};
