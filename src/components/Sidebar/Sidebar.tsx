import useMeasureStore from '../../store/MeasureStore';
import Typography from '@mui/material/Typography';
import { AddTrackedBill } from './AddTrackedBill/AddTrackedBill';
import SidebarMeasure from './SidebarMeasure/SidebarMeasure';
import Box from '@mui/material/Box';
import { styles } from './Sidebar.styles';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from '../Accessories/SearchBar/SearchBar';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { userTrackedMeasures } = useMeasureStore();

  return (
    <Box sx={styles.drawerContainer}>
      <Drawer
        sx={styles.drawer}
        open={open}
        variant="persistent"
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <Box sx={styles.container}>
          <Tooltip title="Close Sidebar">
            <IconButton
              id="closeIcon"
              sx={styles.closeArrows}
              onClick={() => setOpen(false)}
            >
              <KeyboardDoubleArrowLeftRoundedIcon />
            </IconButton>
          </Tooltip>
          <Box sx={styles.section}>
            <Box sx={styles.sectionHeader}>
              <Typography variant="h2">Tracked Bills</Typography>
              <AddTrackedBill />
            </Box>
            {/* <SearchBar /> */}
            {userTrackedMeasures.map((userTrackedMeasure) => (
              <SidebarMeasure
                userTrackedMeasure={userTrackedMeasure}
                key={userTrackedMeasure.id}
              />
            ))}
          </Box>
        </Box>
      </Drawer>
      <Box sx={styles.menuIconContainer}>
        <Tooltip title="Open Sidebar">
          <IconButton onClick={() => setOpen(true)}>
            <MenuRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
