import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useUser } from '../../../utils/user';
import { Theme } from '@mui/material/styles';
import { submitFeedback } from '../../../data/firebaseFirestore';

const Feedback = () => {
  const { currentUser } = useUser();
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (!email || !feedback) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedback({
        email,
        feedback,
        userId: currentUser?.uid || null,
        status: 'Not addressed',
      });

      // Clear form on success
      setEmail(currentUser?.email || '');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={(theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '800px',
        margin: '0 auto',
        padding: theme.spacing(8, 0),
      })}
    >
      <Typography variant="h2">Share your feedback</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Your thoughts and suggestions can help this tool improve. Whether you've
        found a bug, have a feature request, or just want to share your
        experience, please reach out.
        <br />
        <br />
        This form is the easiest for me to track, but I'm also available to
        connect at anna.mj.norman@gmail.com
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        placeholder="Add an email here so I can get back to you"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        label="Feedback"
        multiline
        rows={6}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Use this space to share your thoughts"
        required
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!email || !feedback || isSubmitting}
        sx={{ alignSelf: 'flex-end' }}
        startIcon={
          isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default Feedback;
