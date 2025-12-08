import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import { styles } from './AddGroup.styles';
import {
  getAllGroups,
  addGroupToUser,
  removeGroupFromUser,
  getUserGroupMeasures,
  getGroup,
} from '../../../../data/firebaseFirestore';
import { GroupSummary } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { useUserStore } from '../../../../store/UserStore';

export const AddGroup = () => {
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [allGroups, setAllGroups] = useState<GroupSummary[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminGroupIds, setAdminGroupIds] = useState<Set<string>>(new Set());
  const { currentUser } = useUser();
  const { userGroups, addUserGroup, removeUserGroup, setGroupMeasures } =
    useUserStore();

  useEffect(() => {
    if (open) {
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

      // Check admin status for each user group
      if (currentUser && userGroups.length > 0) {
        const adminChecks = userGroups.map((group) =>
          getGroup(group.id)
            .then((groupData) => {
              if (groupData && groupData.admins.includes(currentUser.uid)) {
                return group.id;
              }
              return null;
            })
            .catch(() => null)
        );

        Promise.all(adminChecks).then((adminIds) => {
          setAdminGroupIds(
            new Set(adminIds.filter((id): id is string => id !== null))
          );
        });
      }
    } else {
      setSelectedGroupId('');
      setShowAddForm(false);
    }
  }, [open, currentUser, userGroups]);

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
      setSelectedGroupId('');
      setShowAddForm(false);
      return;
    }

    // Optimistically update
    addUserGroup(selectedGroup);

    try {
      await addGroupToUser(currentUser.uid, selectedGroupId);
      // Refresh group measures after joining
      const groupMeasures = await getUserGroupMeasures(currentUser.uid);
      setGroupMeasures(groupMeasures);
      setSelectedGroupId('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding group to user:', error);
      removeUserGroup(selectedGroupId);
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setSelectedGroupId('');
  };

  const handleLeave = async (groupId: string) => {
    if (!currentUser) {
      return;
    }

    // Optimistically update
    removeUserGroup(groupId);

    try {
      await removeGroupFromUser(currentUser.uid, groupId);
      // Refresh group measures after leaving
      const groupMeasures = await getUserGroupMeasures(currentUser.uid);
      setGroupMeasures(groupMeasures);
    } catch (error) {
      console.error('Error removing group from user:', error);
      // Revert optimistic update on error
      const group = userGroups.find((g) => g.id === groupId);
      if (group) {
        addUserGroup(group);
      }
    }
  };

  // Filter out groups the user is already in
  const availableGroups = allGroups.filter(
    (group) => !userGroups.some((ug) => ug.id === group.id)
  );

  return (
    <>
      <Tooltip title="Edit Groups">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box sx={styles.dialogContent}>
            <Typography variant="h1">My Groups</Typography>
            {userGroups.length === 0 && !showAddForm ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  You are not in any groups yet.
                </Typography>
                <Button variant="filled" onClick={() => setShowAddForm(true)}>
                  Join a group
                </Button>
              </Box>
            ) : (
              <>
                {userGroups.length > 0 && (
                  <Box>
                    {userGroups.map((group) => (
                      <Box
                        key={group.id}
                        sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                      >
                        <ListItemText primary={group.name} />
                        {adminGroupIds.has(group.id) && (
                          <Chip
                            label="Admin"
                            size="small"
                            sx={{
                              backgroundColor: '#ffee8c',
                            }}
                          />
                        )}
                        <Button
                          variant="text"
                          onClick={() => handleLeave(group.id)}
                        >
                          Leave
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
                {!showAddForm ? (
                  <Box
                    sx={{
                      marginTop: 2,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Tooltip title="Add a group">
                      <IconButton onClick={() => setShowAddForm(true)}>
                        <AddRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      marginTop: 2,
                      alignItems: 'center',
                    }}
                  >
                    <FormControl sx={{ flexGrow: 1, minWidth: 200 }}>
                      <InputLabel>Select a group</InputLabel>
                      <Select
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                        label="Select a group"
                        disabled={isLoading}
                      >
                        {availableGroups.length === 0 ? (
                          <MenuItem disabled value="">
                            No more groups found
                          </MenuItem>
                        ) : (
                          availableGroups.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                              {group.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    <Button variant="text" onClick={handleCancelAdd}>
                      Cancel
                    </Button>
                    <Button
                      variant="filled"
                      onClick={handleJoin}
                      disabled={!selectedGroupId || isLoading}
                    >
                      Join
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
