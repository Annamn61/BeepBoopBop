import { useState } from 'react';
// import './login.scss';
import {
  loginEmailPassword,
  createUser,
  signInWithGoogle,
} from '../../../utils/firebaseAuth';
import google from '../../../assets/GoogleLogo.svg';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styles } from './Login.styles';
import Typography from '@mui/material/Typography';
import logo from '../../../assets/OreganoLogo.svg';
// import logo from '../../assets/FF_Logo.svg';
// import logo_large from '../../assets/FF_logo_large.svg';

export const Login: React.FC = () => {
  const [signingUp, setSigningUp] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmPass] = useState('');

  const [error, setError] = useState<
    undefined | { field: string; message: string }
  >(undefined);

  const submit = () => {
    if (signingUp) {
      if (password === confirm) {
        createUser(email, password).then((ret) => setError(ret));
      } else {
        setError({ field: 'password2', message: 'Passwords do not match' });
      }
    } else {
      loginEmailPassword(email, password).then((ret) => setError(ret));
    }
  };

  const emailField = (
    <TextField
      sx={styles.field}
      value={email}
      type="text"
      variant="outlined"
      placeholder="Email"
      autoFocus={true}
      error={error && error.field === 'email'}
      helperText={error && error.field === 'email' ? error.message : null}
      onChange={(e) => setEmail(e.target.value)}
    />
  );

  const passwordField = (
    <TextField
      sx={styles.field}
      value={password}
      type="password"
      variant="outlined"
      placeholder="Password"
      error={error && error.field === 'password'}
      helperText={error && error.field === 'password' ? error.message : null}
      autoFocus={true}
      onChange={(e) => setPassword(e.target.value)}
    />
  );

  const confirmPasswordField = (
    <TextField
      sx={styles.field}
      value={confirm}
      type="password"
      variant="outlined"
      placeholder="Confirm Password"
      autoFocus={true}
      autoComplete="off"
      error={error && error.field === 'password2'}
      helperText={error && error.field === 'password2' ? error.message : null}
      onChange={(e) => setConfirmPass(e.target.value)}
    />
  );

  const actionButton = (
    <Button disabled={!email || !password} variant="filled" onClick={submit}>
      {signingUp ? 'Sign Up' : 'Sign In'}
    </Button>
  );

  const googleButton = (
    <Button
      sx={styles.googleButton}
      onClick={signInWithGoogle}
      variant="outlined"
    >
      <Box src={google} sx={styles.google} component="img" alt="google logo" />
      Sign in with Google
    </Button>
  );

  const switchButton = () => {
    const helperText = signingUp
      ? 'Already have an account?'
      : "Don't have an account?";
    const buttonText = signingUp ? 'Sign In' : 'Sign Up';
    return (
      <>
        <Typography>{helperText}</Typography>
        <Button
          variant="text"
          //   className="button-text"
          onClick={() => setSigningUp(!signingUp)}
        >
          {buttonText}
        </Button>
      </>
    );
  };

  const errorMessage = error &&
    !['password2', 'password', 'email'].includes(error.field) && (
      <div className="error-message">
        <p>{error?.message}</p>
      </div>
    );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.title}>
        <Typography variant="h1">Welcome</Typography>
        <Box sx={styles.logo} src={logo} component="img" />
      </Box>
      <Typography>
        Sign in to customize the list of bills you're tracking
      </Typography>
      <Box sx={styles.formFields}>
        {emailField}
        {passwordField}
        {signingUp && confirmPasswordField}
        {errorMessage}
        {actionButton}
        or
        {googleButton}
        {switchButton()}
      </Box>
    </Box>
  );
};
