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
          <>
            <Button onClick={setModalOpen}>Logout</Button>
            <LogoutPopup anchorEl={anchorEl} onClose={setModalClosed} />
          </>
        )}
        {!currentUser && (
          <>
            <Button onClick={setModalOpen}>Login</Button>
            <LoginPopup anchorEl={anchorEl} onClose={setModalClosed} />
          </>
        )}
      </FF>
    </Box>
  );
};

export default Header;
