import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

export const userContext = createContext();

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let unsubscribeDoc = null;

        // 1. Listen for Auth State changes
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                // 2. Set up a real-time listener for this specific user doc
                const userRef = doc(db, "users", user.uid);
                
                unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData({ ...docSnap.data(), uid: user.uid });
                    } else {
                        setUserData(null);
                    }
                }, (error) => {
                    console.error("Snapshot error:", error);
                });
            } else {
                // User logged out
                setUserData(null);
                if (unsubscribeDoc) unsubscribeDoc();
            }
        });

        // 3. Cleanup both listeners on unmount
        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
        };
    }, []);
    return (
        <userContext.Provider value={{ userData, setUserData }}>
            {children}
        </userContext.Provider>
    );
}
