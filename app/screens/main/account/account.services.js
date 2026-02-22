import { auth, db, storage } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const AccountService = {
  // Upload and Update PFP
  uploadProfileImage: async (uri) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const storageRef = ref(storage, `images/${auth.currentUser.uid}/pfp.jpg`);
    
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    
    const userDoc = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDoc, { pfp: url });
    return url;
  },

  // Password Reset
  sendResetEmail: async (email) => {
    return await sendPasswordResetEmail(auth, email);
  },

  // Account Deletion
  deleteUserAccount: async (userData) => {
    const batch = writeBatch(db);
    const currentUser = auth.currentUser;
    const userDoc = doc(db, "users", currentUser.uid);
    // Use Promise.all for efficient batching
    userData.circles.forEach((circleID) => {
      const memberData = doc(db, "circles", String(circleID), "members", currentUser.uid);
      batch.delete(memberData);
    });
    batch.delete(userDoc);
    const iamgeRef = ref(storage, `images/${currentUser.uid}/pfp.jpg`);
    deleteObject(iamgeRef).catch((error) => {
        console.error("error: " + error);
    });
    await batch.commit();
    await currentUser.delete();
  }
};