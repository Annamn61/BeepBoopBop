import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseAuth";

export const useUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user); // Update state only when necessary
        });
        return () => unsubscribe(); // Cleanup on unmount
      }, []);

    return {
        currentUser
    }
}