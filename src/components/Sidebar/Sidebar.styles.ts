import { SxProps, Theme } from '@mui/material/styles';
import { DRAWER_WIDTH } from '../../utils/constants';

export const styles: Record<string, SxProps<Theme>> = {
    drawerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    drawer: {
        transition: '0.3s all ease-in-out',
    },
    container: {
        width: `${DRAWER_WIDTH}`,
        boxSizing: 'border-box',
        flexShrink: 0,
        backgroundColor: '#F8F7F7',
        padding: '24px 24px',
        color: 'black',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        "&:hover #closeIcon": {
            visibility: 'visible',
            opacity: 1,
        }
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    }, 
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: 600,
        fontSize: '20px',
    },
    closeArrows: {
        width: '40',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.2s ease-in-out, visibility 0.2s',
    },
    menuIconContainer: {
        padding: '24px',
        position: 'absolute',
    }
};
