import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styles } from './TitleLogo.styles';
import logo from '../../../assets/OreganoLogo.svg';
import { useNavigate } from 'react-router-dom';

const TitleLogo = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ ...styles.container, cursor: 'pointer' }}
      onClick={() => navigate('/')}
    >
      <Box sx={styles.logo} component="img" src={logo} />
      <Box sx={styles.words}>
        <Typography sx={styles.subtitle} variant="body2">
          stay in the know
        </Typography>
        <Typography sx={styles.title} variant="h1">
          oregano
        </Typography>
      </Box>
    </Box>
  );
};

export default TitleLogo;
