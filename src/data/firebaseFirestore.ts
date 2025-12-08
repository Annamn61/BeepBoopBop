import { User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { UserTrackedMeasure } from "../types/MeasureTypes";
import { firebaseApp } from "../utils/firebaseInit";
import { getMeasureUniqueId } from "../utils/measure";

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
        const measureRef = doc(db, `users/${userId}/measures`, getMeasureUniqueId(measure));
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
        const measureRef = doc(db, `users/${userId}/measures`, getMeasureUniqueId(measure));
        await setDoc(measureRef, measure);
        console.log("Measure added successfully.");
    } catch (error) {
        console.error("Error adding measure:", error);
    }
}

export const updateMeasure = async (userId: string, oldMeasureId: string, measure: UserTrackedMeasure) => {
    try {
        const newMeasureId = getMeasureUniqueId(measure);
        const oldMeasureRef = doc(db, `users/${userId}/measures`, oldMeasureId);
        const newMeasureRef = doc(db, `users/${userId}/measures`, newMeasureId);
        
        // If the ID changed (prefix/number/session changed), we need to delete the old and create the new
        if (oldMeasureId !== newMeasureId) {
            await deleteDoc(oldMeasureRef);
            await setDoc(newMeasureRef, measure);
        } else {
            // Just update the existing document
            await updateDoc(oldMeasureRef, {
                MeasurePrefix: measure.MeasurePrefix,
                MeasureNumber: measure.MeasureNumber,
                position: measure.position,
                SessionKey: measure.SessionKey,
                isDisplayed: measure.isDisplayed,
                color: measure.color,
                nickname: measure.nickname,
            });
        }
        console.log("Measure updated successfully.");
    } catch (error) {
        console.error("Error updating measure:", error);
        throw error;
    }
}

export const removeMeasure = async (userId: string, measureId: string) => {
    try {
        const measureRef = doc(db, `users/${userId}/measures`, measureId);
        await deleteDoc(measureRef);
        console.log("Measure removed successfully.");
    } catch (error) {
        console.error("Error removing measure:", error);
        throw error;
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
    const measuresRef = collection(db, `users/${userId}/measures`);

    try {
        const querySnapshot = await getDocs(measuresRef);
        const measures = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        return measures;
    } catch (error) {
        console.error("Error fetching user measures:", error);
        return [];
    }
}

export interface FeedbackEntry {
    id: string;
    timestamp: any; // Firestore Timestamp
    email: string;
    feedback: string;
    userId: string | null;
    status: string;
}

export const submitFeedback = async (feedbackData: Omit<FeedbackEntry, 'timestamp' | 'id'>) => {
    try {
        const feedbackRef = collection(db, 'feedback');
        await addDoc(feedbackRef, {
            ...feedbackData,
            timestamp: serverTimestamp(),
        });
        console.log("Feedback submitted successfully.");
    } catch (error) {
        console.error("Error submitting feedback:", error);
        throw error;
    }
}

// Get all feedback entries (admin only)
export const getFeedbackEntries = async (): Promise<FeedbackEntry[]> => {
    try {
        const feedbackRef = collection(db, 'feedback');
        const querySnapshot = await getDocs(feedbackRef);
        const entries = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as FeedbackEntry[];
        
        // Sort by timestamp descending (newest first)
        return entries.sort((a, b) => {
            if (!a.timestamp || !b.timestamp) return 0;
            return b.timestamp.toMillis() - a.timestamp.toMillis();
        });
    } catch (error) {
        console.error("Error fetching feedback entries:", error);
        throw error;
    }
}

// Update feedback status
export const updateFeedbackStatus = async (feedbackId: string, status: string) => {
    try {
        const feedbackRef = doc(db, 'feedback', feedbackId);
        await updateDoc(feedbackRef, {
            status: status,
        });
        console.log("Feedback status updated successfully.");
    } catch (error) {
        console.error("Error updating feedback status:", error);
        throw error;
    }
}

import { GroupSummary, GroupMeasures } from "../store/UserStore";

// Group types and functions
export interface Group {
    id: string;
    name: string;
    admins: string[]; // Array of user IDs
    measures: UserTrackedMeasure[]; // Array of full measure objects with metadata
}

// Get a list of all groups (names and ids at least)
export const getAllGroups = async (): Promise<GroupSummary[]> => {
    try {
        const groupsRef = collection(db, 'groups');
        const querySnapshot = await getDocs(groupsRef);
        const groups = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || '',
        }));
        return groups;
    } catch (error) {
        console.error("Error fetching all groups:", error);
        throw error;
    }
}

// Get the groups a user is in
export const getUserGroups = async (userId: string): Promise<GroupSummary[]> => {
    try {
        const userGroupsRef = collection(db, `users/${userId}/groups`);
        const querySnapshot = await getDocs(userGroupsRef);
        
        if (querySnapshot.empty) {
            return [];
        }
        
        const groupIds = querySnapshot.docs.map(doc => doc.id);
        
        // Fetch group details for each group ID
        const groupPromises = groupIds.map(async (groupId) => {
            const groupRef = doc(db, 'groups', groupId);
            const groupDoc = await getDoc(groupRef);
            if (groupDoc.exists()) {
                return {
                    id: groupDoc.id,
                    name: groupDoc.data().name || '',
                };
            }
            return null;
        });
        
        const groups = await Promise.all(groupPromises);
        return groups.filter((group): group is GroupSummary => group !== null);
    } catch (error) {
        console.error("Error fetching user groups:", error);
        throw error;
    }
}

// Get group measures and store them in user document structure
export const getUserGroupMeasures = async (userId: string): Promise<GroupMeasures> => {
    try {
        const userGroupsRef = collection(db, `users/${userId}/groups`);
        const querySnapshot = await getDocs(userGroupsRef);
        
        if (querySnapshot.empty) {
            return {};
        }
        
        const groupIds = querySnapshot.docs.map(doc => doc.id);
        
        // Fetch group measures for each group
        const groupMeasures: GroupMeasures = {};
        const groupPromises = groupIds.map(async (groupId) => {
            const groupRef = doc(db, 'groups', groupId);
            const groupDoc = await getDoc(groupRef);
            if (groupDoc.exists()) {
                const measures: UserTrackedMeasure[] = groupDoc.data().measures || [];
                groupMeasures[groupId] = measures;
            }
        });
        
        await Promise.all(groupPromises);
        return groupMeasures;
    } catch (error) {
        console.error("Error fetching user group measures:", error);
        throw error;
    }
}

// Get a full group with all its data
export const getGroup = async (groupId: string): Promise<Group | null> => {
    try {
        const groupRef = doc(db, 'groups', groupId);
        const groupDoc = await getDoc(groupRef);
        
        if (!groupDoc.exists()) {
            return null;
        }
        
        const data = groupDoc.data();
        return {
            id: groupDoc.id,
            name: data.name || '',
            admins: data.admins || [],
            measures: (data.measures || []) as UserTrackedMeasure[],
        };
    } catch (error) {
        console.error("Error fetching group:", error);
        throw error;
    }
}

// Add a group to a user
export const addGroupToUser = async (userId: string, groupId: string) => {
    try {
        const groupRef = doc(db, `users/${userId}/groups`, groupId);
        await setDoc(groupRef, {});
        console.log("Group added to user successfully.");
    } catch (error) {
        console.error("Error adding group to user:", error);
        throw error;
    }
}

// Delete a group from a user
export const removeGroupFromUser = async (userId: string, groupId: string) => {
    try {
        // Delete the document from the subcollection
        const groupRef = doc(db, `users/${userId}/groups`, groupId);
        await deleteDoc(groupRef);
        console.log("Group removed from user successfully.");
    } catch (error) {
        console.error("Error removing group from user:", error);
        throw error;
    }
}

// Add a measure to a group
export const addMeasureToGroup = async (groupId: string, measure: UserTrackedMeasure) => {
    try {
        const groupRef = doc(db, 'groups', groupId);
        const groupDoc = await getDoc(groupRef);
        
        if (!groupDoc.exists()) {
            throw new Error("Group not found");
        }
        
        const currentMeasures: UserTrackedMeasure[] = groupDoc.data().measures || [];
        // Check if measure already exists (by unique ID)
        const measureId = getMeasureUniqueId(measure);
        const exists = currentMeasures.some(m => getMeasureUniqueId(m) === measureId);
        
        if (!exists) {
            await updateDoc(groupRef, {
                measures: [...currentMeasures, measure],
            });
            console.log("Measure added to group successfully.");
        } else {
            console.log("Measure already exists in group.");
        }
    } catch (error) {
        console.error("Error adding measure to group:", error);
        throw error;
    }
}

// Remove a measure from a group
export const removeMeasureFromGroup = async (groupId: string, measureId: string) => {
    try {
        const groupRef = doc(db, 'groups', groupId);
        const groupDoc = await getDoc(groupRef);
        
        if (!groupDoc.exists()) {
            throw new Error("Group not found");
        }
        
        const currentMeasures: UserTrackedMeasure[] = groupDoc.data().measures || [];
        const updatedMeasures = currentMeasures.filter(m => getMeasureUniqueId(m) !== measureId);
        
        await updateDoc(groupRef, {
            measures: updatedMeasures,
        });
        console.log("Measure removed from group successfully.");
    } catch (error) {
        console.error("Error removing measure from group:", error);
        throw error;
    }
}

// Update a measure in a group
export const updateMeasureInGroup = async (groupId: string, oldMeasureId: string, updatedMeasure: UserTrackedMeasure) => {
    try {
        const groupRef = doc(db, 'groups', groupId);
        const groupDoc = await getDoc(groupRef);
        
        if (!groupDoc.exists()) {
            throw new Error("Group not found");
        }
        
        const currentMeasures: UserTrackedMeasure[] = groupDoc.data().measures || [];
        const updatedMeasures = currentMeasures.map(m => 
            getMeasureUniqueId(m) === oldMeasureId ? updatedMeasure : m
        );
        
        await updateDoc(groupRef, {
            measures: updatedMeasures,
        });
        console.log("Measure updated in group successfully.");
    } catch (error) {
        console.error("Error updating measure in group:", error);
        throw error;
    }
}
