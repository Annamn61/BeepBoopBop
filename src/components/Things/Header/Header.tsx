import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useModal } from '../../../utils/modal';
import { useUser } from '../../../utils/user';
import TitleLogo from '../../Accessories/TitleLogo/TitleLogo';
import { styles } from './Header.styles';

interface Props {}

const Header = ({}: Props) => {
  const { setModalClosed } = useModal();

  const { currentUser } = useUser();

  useEffect(() => {
    setModalClosed();
  }, [currentUser]);

  return (
    <Box sx={styles.container}>
      <TitleLogo />
      {/* {currentUser && (
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
      )} */}
    </Box>
  );
};

export default Header;
