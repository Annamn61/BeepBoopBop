import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GroupSummary, useUserStore } from '../../../../store/UserStore';
import { styles } from './SidebarGroup.styles';
import { useMemo, useEffect, useState } from 'react';
import SidebarMeasure from '../SidebarMeasure/SidebarMeasure';
import { getMeasureUniqueId } from '../../../../utils/measure';
import { AddGroupMeasure } from '../AddGroupMeasure/AddGroupMeasure';
import {
  getUserGroupMeasures,
  getGroup,
} from '../../../../data/firebaseFirestore';
import { useUser } from '../../../../utils/user';

interface SidebarGroupProps {
  group: GroupSummary;
}

const SidebarGroup = ({ group }: SidebarGroupProps) => {
  const userTrackedMeasures = useUserStore(
    (state) => state.userTrackedMeasures
  );
  const groupMeasures = useUserStore((state) => state.groupMeasures);
  const userGroups = useUserStore((state) => state.userGroups);
  const getAllTrackedMeasuresWithSource = useUserStore(
    (state) => state.getAllTrackedMeasuresWithSource
  );
  const { setGroupMeasures } = useUserStore();
  const { currentUser } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  // Get all measures with source tracking and filter for this group
  const groupMeasuresList = useMemo(() => {
    const allMeasures = getAllTrackedMeasuresWithSource();
    const filtered = allMeasures.filter(
      (measure) =>
        measure.source !== 'user' &&
        typeof measure.source === 'object' &&
        measure.source.type === 'group' &&
        measure.source.groupId === group.id
    );
    console.log(`Group ${group.id} (${group.name}):`, {
      allMeasuresCount: allMeasures.length,
      filteredCount: filtered.length,
      groupMeasuresStore: groupMeasures[group.id],
      filteredMeasures: filtered,
    });
    return filtered;
  }, [
    getAllTrackedMeasuresWithSource,
    group.id,
    userTrackedMeasures,
    groupMeasures,
    userGroups,
  ]);

  const fetchGroupData = () => {
    if (currentUser) {
      getUserGroupMeasures(currentUser.uid)
        .then((fetchedGroupMeasures) => {
          console.log('Fetched group measures:', fetchedGroupMeasures);
          setGroupMeasures(fetchedGroupMeasures);
        })
        .catch((error) => {
          console.error('Error fetching group measures:', error);
        });
    }
  };

  // Fetch group data and check admin status on mount
  useEffect(() => {
    fetchGroupData();
    if (currentUser) {
      getGroup(group.id)
        .then((groupData) => {
          if (groupData) {
            console.log('Group data:', groupData);
            setIsAdmin(groupData.admins.includes(currentUser.uid));
          }
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    }
  }, [group.id, currentUser]);

  return (
    <Box sx={styles.groupContainer}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h2">{group.name}</Typography>
        {isAdmin && (
          <AddGroupMeasure groupId={group.id} onMeasureAdded={fetchGroupData} />
        )}
      </Box>
      {groupMeasuresList.map((measure) => {
        const isGroupMeasure =
          typeof measure.source === 'object' && measure.source.type === 'group';
        const groupSource = isGroupMeasure
          ? (measure.source as {
              type: 'group';
              groupId: string;
              groupName: string;
            })
          : null;
        return (
          <SidebarMeasure
            userTrackedMeasure={measure}
            isDuplicate={measure.isDuplicate}
            isGroupMeasure={isGroupMeasure}
            groupId={groupSource?.groupId}
            isGroupAdmin={isGroupMeasure ? isAdmin : undefined}
            onGroupMeasureRemoved={isGroupMeasure ? fetchGroupData : undefined}
            key={getMeasureUniqueId(measure)}
          />
        );
      })}
    </Box>
  );
};

export default SidebarGroup;
