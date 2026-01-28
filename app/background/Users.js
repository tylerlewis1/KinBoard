import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
export const userContext = createContext();
export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    // uid: null,
    //     name: "",
    //     circles: [],
    //     pfp: 1,
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        //set user data
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);
  return(
    <userContext.Provider value={{userData, setUserData}}>
        {children}
    </userContext.Provider>
  );
}