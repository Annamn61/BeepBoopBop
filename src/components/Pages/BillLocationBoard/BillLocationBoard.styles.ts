import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    sectionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    groupsContainer: {
        paddingRight: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        width: 'fit-content'
    },
};
