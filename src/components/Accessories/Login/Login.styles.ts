import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '300px',
    },
    formFields: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center'
    },
    field: {
        width: '100%'
    },
    google: {
        height: '24px',
    },
    googleButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1.5,
        paddingLeft: 2.5,
        paddingRight: 3,
        borderRadius: '20px'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center'
    },
    logo: {
        height: '36px',
    },
};
