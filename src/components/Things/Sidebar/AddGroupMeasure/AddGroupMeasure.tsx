import {
  addMeasureToGroup,
  getUserGroupMeasures,
} from '../../../../data/firebaseFirestore';
import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { AddBillModal } from '../AddBillModal/AddBillModal';
import { UserTrackedMeasure } from '../../../../types/MeasureTypes';

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
    measureColor: string,
    sessionKey: string,
    nickname: string,
    position: 'Support' | 'Oppose' | '?'
  ) => {
    const measure: UserTrackedMeasure = {
      MeasurePrefix: measurePrefix,
      MeasureNumber: measureNumber,
      SessionKey: sessionKey,
      position: position,
      isDisplayed: true,
      color: measureColor,
      nickname: nickname,
    };

    // Save to Firebase
    try {
      await addMeasureToGroup(groupId, measure);
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
