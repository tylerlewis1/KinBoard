import { auth, db, storage } from "@/firebase";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CircleService = {
  // Upload Circle Cover Image
  uploadCover: async (uri, circleId) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const storageRef = ref(storage, `images/circles/${circleId}/cover.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  },

  // Create the Circle and setup default sub-collections
  finalizeCircle: async (circleId, name, imageUrl, userData) => {
    const batch = writeBatch(db);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const circleRef = doc(db, "circles", String(circleId));
    
    // Sub-collection references
    const memberDoc = doc(db, "circles", String(circleId), "members", auth.currentUser.uid);
    const annRef = doc(db, "circles", String(circleId), "home", "announcements");
    const homeMods = doc(db, "circles", String(circleId), "home", "modules");

    // 1. Update User's circle list
    batch.set(userRef, { circles: arrayUnion(circleId) }, { merge: true });

    // 2. Set Circle Main Doc
    batch.set(circleRef, {
      name,
      id: String(circleId),
      created: new Date(),
      cover: imageUrl
    });

    // 3. Add Creator as Owner
    batch.set(memberDoc, {
      name: userData.name,
      uid: auth.currentUser.uid,
      pfp: userData.pfp || "",
      role: "Owner",
      mods: []
    });

    // 4. Default Greeting
    batch.set(annRef, {
      msgs: {
        msg: "Welcome to your new Circle!",
        pfp: "",
        date: new Date(),
        who: "System"
      }
    });

    batch.set(homeMods, { mods: [] });

    return await batch.commit();
  }
};