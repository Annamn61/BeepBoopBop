import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useModal } from '../../../utils/modal';
import { useUser } from '../../../utils/user';
import TitleLogo from '../../Accessories/TitleLogo/TitleLogo';
import { styles } from './Header.styles';
import Button from '@mui/material/Button';
import LogoutPopup from '../LogoutPopup/LogoutPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BugReportIcon from '@mui/icons-material/BugReport';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Props {}

const Header = ({}: Props) => {
  const { setModalClosed, anchorEl, setModalOpen } = useModal();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    setModalClosed();
  }, [currentUser]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleFeedbackClick = () => {
    navigate('/feedback');
    handleMenuClose();
  };

  return (
    <Box sx={styles.container}>
      <TitleLogo />
      <Box sx={styles.rightSection}>
        {!isMobile && (
          <>
            {currentUser && (
              <Box sx={styles.logout}>
                <Typography sx={styles.emailText}>
                  {currentUser.email}
                </Typography>
                <Button variant="text" onClick={setModalOpen}>
                  Logout
                </Button>
                <LogoutPopup anchorEl={anchorEl} onClose={setModalClosed} />
              </Box>
            )}
            {!currentUser && (
              <>
                <Button variant="filled" onClick={setModalOpen}>
                  Login
                </Button>
                <LoginPopup anchorEl={anchorEl} onClose={setModalClosed} />
              </>
            )}
            <Tooltip title="Submit Feedback">
              <IconButton onClick={() => navigate('/feedback')}>
                <BugReportIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        {isMobile && (
          <>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
            >
              {currentUser && (
                <>
                  <MenuItem
                    onClick={(e) => {
                      setModalOpen(e);
                      handleMenuClose();
                    }}
                  >
                    <ListItemText
                      primary="Logout"
                      secondary={currentUser.email}
                    />
                  </MenuItem>
                  <LogoutPopup anchorEl={anchorEl} onClose={setModalClosed} />
                </>
              )}
              {!currentUser && (
                <>
                  <MenuItem
                    onClick={(e) => {
                      setModalOpen(e);
                      handleMenuClose();
                    }}
                  >
                    Login
                  </MenuItem>
                  <LoginPopup anchorEl={anchorEl} onClose={setModalClosed} />
                </>
              )}
              <MenuItem onClick={handleFeedbackClick}>
                <ListItemText>Submit Feedback</ListItemText>
                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                  <BugReportIcon fontSize="small" />
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
