import {
  addMeasureToGroup,
  getUserGroupMeasures,
} from '../../../../data/firebaseFirestore';
import { getMeasureUniqueId } from '../../../../utils/measure';
import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { AddBillModal } from '../AddBillModal/AddBillModal';

interface AddGroupMeasureProps {
  groupId: string;
  onMeasureAdded?: () => void;
}

export const AddGroupMeasure = ({
  groupId,
  onMeasureAdded,
}: AddGroupMeasureProps) => {
  const { setGroupMeasures } = useUserStore();
  const { currentUser } = useUser();

  const handleAdd = async (
    measurePrefix: string,
    measureNumber: number,
    _measureColor: string,
    sessionKey: string,
    _nickname: string
  ) => {
    const measureUniqueId = getMeasureUniqueId({
      MeasurePrefix: measurePrefix,
      MeasureNumber: measureNumber,
      SessionKey: sessionKey,
    });

    // Save to Firebase
    try {
      await addMeasureToGroup(groupId, measureUniqueId);
      // Refresh group measures in store
      if (currentUser) {
        const groupMeasures = await getUserGroupMeasures(currentUser.uid);
        setGroupMeasures(groupMeasures);
      }
      if (onMeasureAdded) {
        onMeasureAdded();
      }
    } catch (error) {
      console.error('Error adding measure to group:', error);
    }
  };

  return (
    <AddBillModal
      title="Add Measure to Group"
      tooltip="Add measure to group"
      onAdd={handleAdd}
    />
  );
};
