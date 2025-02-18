import { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
    measureFilter: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
    },
    checkbox: {
        height: '20px',
        width: '20px',
        minWidth: 'unset',
        padding: 0,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '4px',
        flexShrink: 0,
        '&:hover': {
            filter: 'brightness(80%)',
        }
    },
    infoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flexStart',
        textAlign: 'left',
        gap: '8px',
    },
    measureId: {
        fontWeight: 600,
    }, 
}