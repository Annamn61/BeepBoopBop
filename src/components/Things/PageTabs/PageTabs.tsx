import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styles } from './PageTabs.styles';
import { SxProps, Theme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const PageTabs = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const selectedPage = useMemo(() => {
    if (pathname.includes('/bill/')) {
      return 'bill';
    }
    if (pathname.includes('/parser')) {
      return 'parser';
    }
    if (pathname.includes('/calendar')) {
      return 'calendar';
    }
    if (pathname.includes('/updates')) {
      return 'updates';
    }
    if (pathname.includes('/location')) {
      return 'location';
    }
    if (pathname.includes('/votes')) {
      return 'votes';
    }
    if (pathname.includes('/')) {
      return 'updates';
    }
  }, [pathname]);

  const setSelectedPage = useCallback(
    (selectedPage: string) => {
      if (selectedPage === 'updates') {
        navigate('/updates');
      }
      if (selectedPage === 'parser') {
        navigate('/parser');
      }
      if (selectedPage === 'calendar') {
        navigate('/calendar');
      }
      if (selectedPage === 'location') {
        navigate('/location');
      }
      if (selectedPage === 'votes') {
        navigate('/votes');
      }
    },
    [navigate]
  );

  const ButtonTab = ({ label, path }: { label: string; path: string }) => {
    return (
      <Button
        variant="contained"
        sx={
          [
            styles.tabButton,
            ...(selectedPage === path ? [styles.activeTabButton] : []),
          ] as SxProps<Theme>
        }
        onClick={() => setSelectedPage(path)}
      >
        <Typography
          sx={{
            ...styles.tabText,
            ...((selectedPage === path ? styles.activeText : {}) as any),
          }}
          variant="button"
        >
          {label}
        </Typography>
      </Button>
    );
  };

  return (
    <Box sx={styles.buttonRow}>
      <ButtonTab label="Updates" path="updates" />
      <ButtonTab label="Location" path="location" />
      <ButtonTab label="Calendar" path="calendar" />
      <ButtonTab label="Votes" path="votes" />
      <ButtonTab label="Parser" path="parser" />
    </Box>
  );
};

export default PageTabs;
