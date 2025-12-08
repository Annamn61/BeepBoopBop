import { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
    measureFilterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '16px',
        padding: 2,
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: '#EDEDED',
            cursor: 'pointer',
        },
        '&:hover #deleteIcon': {
            visibility: 'visible',
        },
        '&:hover #editIcon': {
            visibility: 'visible',
        }
    },
    checkbox: {
        marginTop: '6px',
        minWidth: 'unset',
        padding: 0,
        '&:hover': {
            filter: 'brightness(80%)',
        }
    },
    infoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flexStart',
        textAlign: 'left',
        gap: '4px',
        flexGrow: 1,
    },
    infoTopline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteIcon: {
        visibility: 'hidden',
    },
    disabled: {
        textDecoration: 'line-through',
    },
}