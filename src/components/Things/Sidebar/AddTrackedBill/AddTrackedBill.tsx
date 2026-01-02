import { useUserStore } from '../../../../store/UserStore';
import { useUser } from '../../../../utils/user';
import { addMeasure } from '../../../../data/firebaseFirestore';
import { AddBillModal } from '../AddBillModal/AddBillModal';

export const AddTrackedBill = () => {
  const { addUserTrackedMeasure } = useUserStore();
  const { currentUser } = useUser();

  const handleAdd = async (
    measurePrefix: string,
    measureNumber: number,
    measureColor: string,
    sessionKey: string,
    nickname: string,
    position: 'Support' | 'Oppose' | '?'
  ) => {
    const newMeasure = {
      color: measureColor,
      position: position,
      MeasurePrefix: measurePrefix,
      MeasureNumber: measureNumber,
      isDisplayed: true,
      SessionKey: sessionKey,
      nickname: nickname,
    };

    // Optimistically update the store (appears immediately)
    addUserTrackedMeasure(newMeasure);

    // Save to Firebase if user is logged in
    if (currentUser) {
      try {
        await addMeasure(currentUser.uid, newMeasure);
      } catch (error) {
        console.error('Error adding measure to Firebase:', error);
        // TODO: Could revert the optimistic update here if needed
      }
    }
  };

  return (
    <AddBillModal
      title="Add Bill to Track"
      tooltip="Add bill to track"
      onAdd={handleAdd}
    />
  );
};
