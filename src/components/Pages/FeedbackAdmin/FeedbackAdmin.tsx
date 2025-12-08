import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useUser } from '../../../utils/user';
import { Theme } from '@mui/material/styles';
import {
  getFeedbackEntries,
  updateFeedbackStatus,
  FeedbackEntry,
} from '../../../data/firebaseFirestore';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { getShortFormatDateWithTime } from '../../../utils/time';

const FeedbackAdmin = () => {
  const { currentUser } = useUser();
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadFeedback();
    }
  }, [currentUser]);

  const loadFeedback = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const entries = await getFeedbackEntries();
      setFeedbackEntries(entries);
    } catch (error: any) {
      console.error('Error loading feedback:', error);
      // If permission denied, show access denied message
      if (error?.code === 'permission-denied') {
        setError(
          'Access Denied: You do not have permission to view this page.'
        );
      } else {
        setError('Error loading feedback. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (feedbackId: string, newStatus: string) => {
    try {
      await updateFeedbackStatus(feedbackId, newStatus);
      // Update local state
      setFeedbackEntries((prev) =>
        prev.map((entry) =>
          entry.id === feedbackId ? { ...entry, status: newStatus } : entry
        )
      );
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h2">Please log in to access this page.</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h2">Access Denied</Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={(theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing(4, 2),
      })}
    >
      <Typography variant="h2">Feedback Administration</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Total feedback entries: {feedbackEntries.length}
      </Typography>

      {feedbackEntries.length === 0 ? (
        <Typography variant="body1">No feedback entries found.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {feedbackEntries.map((entry) => (
            <Paper key={entry.id} sx={{ padding: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography variant="h6">{entry.email}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {entry.timestamp
                        ? getShortFormatDateWithTime(entry.timestamp.toDate())
                        : 'Date unavailable'}
                    </Typography>
                    {entry.userId && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        User ID: {entry.userId}
                      </Typography>
                    )}
                  </Box>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={entry.status}
                      label="Status"
                      onChange={(e) =>
                        handleStatusChange(entry.id, e.target.value)
                      }
                    >
                      <MenuItem value="Not addressed">Not addressed</MenuItem>
                      <MenuItem value="in progress">In progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {entry.feedback}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FeedbackAdmin;
