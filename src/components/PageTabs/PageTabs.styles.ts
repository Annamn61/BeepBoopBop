import { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    tabButton: {
        paddingTop: 1, 
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: '#f7f7f7',
        boxShadow: 'none',
        '&:hover': {
            filter: 'brightness(80%)',
            boxShadow: 'none',
        }
    },
    activeTabButton: {
        color: '#3E753B',
        backgroundColor: '#D4ECD4',
    },
    tabText: {
        color: '#A7A7A7 !important',
    },
    activeText: {
         color: '#3E753B !important',
    }
}