import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useModal } from '../../../utils/modal';
import { useUser } from '../../../utils/user';
import TitleLogo from '../../Accessories/TitleLogo/TitleLogo';
import { styles } from './Header.styles';
import FF from '../FF/FF';
import Button from '@mui/material/Button';
import LogoutPopup from '../LogoutPopup/LogoutPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import Typography from '@mui/material/Typography';

interface Props {}

const Header = ({}: Props) => {
  const { setModalClosed, anchorEl, setModalOpen } = useModal();

  const { currentUser } = useUser();

  useEffect(() => {
    setModalClosed();
  }, [currentUser]);

  return (
    <Box sx={styles.container}>
      <TitleLogo />
      <FF value="login">
        {currentUser && (
          <Box sx={styles.logout}>
            <Typography>{currentUser.email}</Typography>
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
      </FF>
    </Box>
  );
};

export default Header;
