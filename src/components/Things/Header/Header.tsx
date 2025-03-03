import Box from '@mui/material/Box';
import TitleLogo from '../../Accessories/TitleLogo/TitleLogo';
import Button from '@mui/material/Button';
import { useModal } from '../../../utils/modal';
import { styles } from './Header.styles';
import LoginPopup from '../LoginPopup/LoginPopup';
import { auth } from '../../../utils/firebaseAuth';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

interface Props {}

const Header = ({}: Props) => {
  const { anchorEl, setModalOpen, setModalClosed } = useModal();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update state only when necessary
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    setModalClosed();
  }, [currentUser]);

  //   useEffect(() => {
  //     console.log('anchorEl', anchorEl);
  //   }, [anchorEl]);

  //   useEffect(() => {
  //     console.log('setModalOpen', setModalOpen);
  //   }, [setModalOpen]);

  //   useEffect(() => {
  //     console.log('setModalClosed', setModalClosed);
  //   }, [setModalClosed]);

  //   useEffect(() => {
  //     console.log('currentUser', currentUser);
  //   }, [currentUser]);

  //   useEffect(() => {
  //     console.log('setCurrentUser', setCurrentUser);
  //   }, [setCurrentUser]);

  return (
    <Box sx={styles.container}>
      <TitleLogo />
      {currentUser && (
        <>
          <Button onClick={setModalOpen}>Logout</Button>
          <LoginPopup anchorEl={anchorEl} onClose={setModalClosed} />
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
