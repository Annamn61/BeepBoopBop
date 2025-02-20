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
          <IconButton
            id="closeIcon"
            sx={styles.closeArrows}
            onClick={() => setOpen(false)}
          >
            <KeyboardDoubleArrowLeftRoundedIcon />
          </IconButton>
          <Box sx={styles.section}>
            <Box sx={styles.sectionHeader}>
              <Typography variant="h6">Tracked Bills</Typography>
              <AddTrackedBill />
            </Box>
            {userTrackedMeasures.map((userTrackedMeasure) => (
              <SidebarMeasure userTrackedMeasure={userTrackedMeasure} />
            ))}
          </Box>
        </Box>
      </Drawer>
      <Box sx={styles.menuIconContainer}>
        <IconButton onClick={() => setOpen(true)}>
          <MenuRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
