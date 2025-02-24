import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styles } from './PageTabs.styles';
import { SxProps, Theme } from '@mui/material/styles';

interface PageTabProps {
  selectedPage: string;
  setSelectedPage: (selectedPage: string) => void;
}

const PageTabs = ({ selectedPage, setSelectedPage }: PageTabProps) => {
  return (
    <Box sx={styles.buttonRow}>
      <Button
        variant="contained"
        sx={
          [
            styles.tabButton,
            ...(selectedPage === 'location' ? [styles.activeTabButton] : []),
          ] as SxProps<Theme>
        }
        onClick={() => setSelectedPage('location')}
      >
        <Typography variant="button">Location</Typography>
      </Button>
      <Button
        variant="contained"
        sx={
          [
            styles.tabButton,
            ...(selectedPage === 'updates' ? [styles.activeTabButton] : []),
          ] as SxProps<Theme>
        }
        onClick={() => setSelectedPage('updates')}
      >
        <Typography variant="button">Updates</Typography>
      </Button>
      <Button
        variant="contained"
        sx={
          [
            styles.tabButton,
            ...(selectedPage === 'calendar' ? [styles.activeTabButton] : []),
          ] as SxProps<Theme>
        }
        onClick={() => setSelectedPage('calendar')}
      >
        <Typography variant="button">Calendar</Typography>
      </Button>
    </Box>
  );
};

export default PageTabs;
