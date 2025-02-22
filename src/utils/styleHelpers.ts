import { SxProps, Theme } from '@mui/material/styles';

export const globalStyles: Record<string, SxProps<Theme>> = {
    twoLineEllipses: {
        display: '-webkit-box',
        maxWidth: '100%',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        WebkitBoxOrient: "vertical"
    }
};
