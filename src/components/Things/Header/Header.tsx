import Box from '@mui/material/Box';
import TitleLogo from '../../Accessories/TitleLogo/TitleLogo';
import Button from '@mui/material/Button';
import { useModal } from '../../../utils/modal';
import { styles } from './Header.styles';
import LoginPopup from '../LoginPopup/LoginPopup';
import { useEffect } from 'react';
import { useUser } from '../../../utils/user';
import LogoutPopup from '../LogoutPopup/LogoutPopup';

interface Props {}

const Header = ({}: Props) => {
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const { currentUser } = useUser();

  useEffect(() => {
    setModalClosed();
  }, [currentUser]);

  return (
    <Box sx={styles.container}>
      <TitleLogo />
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
    </Box>
  );
};

export default Header;
