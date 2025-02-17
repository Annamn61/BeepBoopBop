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
        color: '#A7A7A7',
        backgroundColor: '#f7f7f7',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#e7e7e7',
            boxShadow: 'none',
            color: '#878787',
        }
    },
    activeTabButton: {
        color: '#3E753B',
        backgroundColor: '#D4ECD4',
    },
    buttonText: {
        fontWeight: 600,
    }
}