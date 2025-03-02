import { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
    contentContainer: {
        overflow: 'hidden',
        paddingTop: {
            xs: 8,
            md: 4,
        },
        paddingBottom: 4,
        transition: '0.3s all ease-in-out',
      },
regularPageContainers: {
    paddingRight: {
        xs: 2,
        md: 12,
    },
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    transition: '0.3s all ease-in-out',
  }
};
