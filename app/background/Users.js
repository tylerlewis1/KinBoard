import { createContext, useState } from "react";
export const userContext = createContext();
export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    // uid: null,
    //     name: "",
    //     circles: [],
    //     pfp: 1,
//     useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         //set user data
//       } else {
//         setUserData({ uid: null, name: "" });
//       }
//     });

//     return unsubscribe;
//   }, []);
  return(
    <userContext.Provider value={{userData, setUserData}}>
        {children}
    </userContext.Provider>
  );
}