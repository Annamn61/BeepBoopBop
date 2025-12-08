import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { styles } from './AddGroup.styles';
import {
  getAllGroups,
  addGroupToUser,
  getUserGroupMeasures,
} from '../../../../data/firebaseFirestore';
import { GroupSummary } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { useUserStore } from '../../../../store/UserStore';

export const AddGroup = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [allGroups, setAllGroups] = useState<GroupSummary[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useUser();
  const { userGroups, addUserGroup, removeUserGroup, setGroupMeasures } =
    useUserStore();

  useEffect(() => {
    if (anchorEl) {
      setIsLoading(true);
      getAllGroups()
        .then((groups) => {
          setAllGroups(groups);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching groups:', error);
          setIsLoading(false);
        });
    } else {
      setSelectedGroupId('');
    }
  }, [anchorEl]);

  const handleJoin = async () => {
    if (!selectedGroupId || !currentUser) {
      return;
    }

    const selectedGroup = allGroups.find((g) => g.id === selectedGroupId);
    if (!selectedGroup) {
      return;
    }

    const isAlreadyInGroup = userGroups.some((g) => g.id === selectedGroupId);
    if (isAlreadyInGroup) {
      console.log('User is already in this group');
      setAnchorEl(null);
      return;
    }

    setAnchorEl(null);

    addUserGroup(selectedGroup);

    try {
      await addGroupToUser(currentUser.uid, selectedGroupId);
      // Refresh group measures after joining
      const groupMeasures = await getUserGroupMeasures(currentUser.uid);
      setGroupMeasures(groupMeasures);
    } catch (error) {
      console.error('Error adding group to user:', error);
      removeUserGroup(selectedGroupId);
    }
  };

  return (
    <>
      <Tooltip title="Join a group">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={styles.container}>
          <Typography variant="h2" sx={styles.title}>
            Join a Group
          </Typography>
          <FormControl fullWidth sx={styles.select}>
            <InputLabel>Select a group</InputLabel>
            <Select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              label="Select a group"
              disabled={isLoading}
            >
              {allGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="filled"
            onClick={handleJoin}
            disabled={!selectedGroupId || isLoading}
            sx={styles.joinButton}
          >
            Join
          </Button>
        </Box>
      </Popover>
    </>
  );
};
