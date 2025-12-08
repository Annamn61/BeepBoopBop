import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GroupSummary, useUserStore } from '../../../../store/UserStore';
import { styles } from './SidebarGroup.styles';
import { useMemo, useEffect } from 'react';
import SidebarMeasure from '../SidebarMeasure/SidebarMeasure';
import { getMeasureUniqueId } from '../../../../utils/measure';
import { AddGroupMeasure } from '../AddGroupMeasure/AddGroupMeasure';
import { getUserGroupMeasures } from '../../../../data/firebaseFirestore';
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

  // Fetch group data on mount
  useEffect(() => {
    fetchGroupData();
  }, [group.id, currentUser]);

  return (
    <Box sx={styles.groupContainer}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h2">{group.name}</Typography>
        <AddGroupMeasure groupId={group.id} onMeasureAdded={fetchGroupData} />
      </Box>
      {groupMeasuresList.map((measure) => (
        <SidebarMeasure
          userTrackedMeasure={measure}
          isDuplicate={measure.isDuplicate}
          groupNickname={
            typeof measure.source === 'object' &&
            measure.source.type === 'group'
              ? measure.source.groupName
              : undefined
          }
          key={getMeasureUniqueId(measure)}
        />
      ))}
    </Box>
  );
};

export default SidebarGroup;
