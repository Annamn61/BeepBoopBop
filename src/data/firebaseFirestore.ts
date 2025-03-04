import { User } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, setDoc, writeBatch } from "firebase/firestore";
import { UserTrackedMeasure } from "../types/MeasureTypes";
import { firebaseApp } from "../utils/firebaseInit";

const db = getFirestore(firebaseApp);

// async function updateMeasure(userId: string, measureId: string, updatedData: string) {
//     try {
//         const measureRef = doc(db, `users/${userId}/measure`, measureId);
//         await updateDoc(measureRef, updatedData);
//         console.log("Measure updated successfully");
//     } catch (error) {
//         console.error("Error updating measure:", error);
//     }
// }

// Example usage
// updateMeasure("user123", "measure456", { color: "#FF5733", sessionKey: "new-session-key" });

// user.uid
export const batchAddMeasures = async (userId: string, measures: UserTrackedMeasure[]) => {
    const batch = writeBatch(db);

    measures.forEach((measure) => {
        const measureRef = doc(db, `users/${userId}/measure`, measure.id);
        batch.set(measureRef, measure);
    });

    try {
        await batch.commit();
        console.log("Batch add completed successfully.");
    } catch (error) {
        console.error("Error performing batch add:", error);
    }
}

// Example usage
// batchAddMeasures("user123", [
//     { measureId: "measure101", measureData: { id: "measure101", color: "#AA0000" } },
//     { measureId: "measure102", measureData: { id: "measure102", color: "#00AA00" } }
// ]);

export const addMeasure = async (userId: string, measure: UserTrackedMeasure) => {
    try {
        const measureRef = doc(db, `users/${userId}/measure`, measure.id);
        await setDoc(measureRef, measure);
        console.log("Measure added successfully.");
    } catch (error) {
        console.error("Error adding measure:", error);
    }
}

// Example usage
// addMeasure("user123", "measure789", { 
//     id: "measure789", 
//     color: "#123456", 
//     sessionKey: "abc123" 
// });

export const getRemoteUserTrackedMeasures = async (user: User) => {

    const userId = user.uid;
    const measuresRef = collection(db, `users/${userId}/measure`);

    try {
        const querySnapshot = await getDocs(measuresRef);
        const measures = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log("User measures:", measures);
        return measures;
    } catch (error) {
        console.error("Error fetching user measures:", error);
        return [];
    }
}
