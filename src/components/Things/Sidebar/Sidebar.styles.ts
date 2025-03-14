import { SxProps, Theme } from '@mui/material/styles';
import { DRAWER_WIDTH } from '../../../utils/constants';

export const styles: Record<string, SxProps<Theme>> = {
    drawerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    drawer: {
        transition: '0.3s all ease-in-out',
    },
    container: {
        width: `${DRAWER_WIDTH}`,
        boxSizing: 'border-box',
        minHeight: '100vh',
        flexShrink: 0,
        backgroundColor: '#F7F7F7',
        padding: '24px 24px',
        color: 'black',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 0.5,
        "&:hover #closeIcon": {
            visibility: 'visible',
            opacity: 1,
        }
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
    }, 
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '20px',
        alignItems: 'center'
    },
    closeArrows: {
        width: '40',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.2s ease-in-out, visibility 0.2s',
    },
    menuIconContainer: {
        padding: {
            xs: 2,
            md: 3,
        },
        position: {
            xs: 'absolute',
            md: 'fixed',
        },
    }
};
