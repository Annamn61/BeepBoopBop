import { collection, addDoc, getDocs, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { getFirestore, query, where } from "firebase/firestore";
import dayjs, { Dayjs } from "dayjs";
import { firebaseApp } from "../utils/firebaseInit";

const db = getFirestore(firebaseApp);

interface addFoodType {
  id: number, amount: number, unit: string
}

export async function writeUserFood(name: string, id: number, amount: number, unit: string, day: Dayjs) {
  const result = await addDoc(collection(db, 'users/' + name + '/foods'), {
    id,
    addedDate: day.valueOf(),
    amount,
    unit,
  });
  return (result as any)._key.path.segments[3];
}

export async function deleteUserFood(user_uid: string, uuid: string) {
  const result = await deleteDoc(doc(db, 'users/' + user_uid + '/foods', uuid));
}
