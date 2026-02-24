import { auth, db } from "@/firebase";
import { arrayUnion, doc, getDoc, writeBatch } from "firebase/firestore";

export const JoinService = {
  joinCircleByCode: async (code, userData) => {
    const circleId = String(code);
    const circleRef = doc(db, "circles", circleId);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const memberDocInCircle = doc(db, "circles", circleId, "members", auth.currentUser.uid);

    // 1. Check if circle exists
    const circleSnap = await getDoc(circleRef);
    if (!circleSnap.exists()) {
      throw new Error("Circle not found");
    }

    const batch = writeBatch(db);

    // 2. Add to User's list of circles
    batch.update(userRef, {
      circles: arrayUnion(Number(circleId))
    });

    // 3. Add to Circle's members sub-collection
    batch.set(memberDocInCircle, {
      name: userData.name,
      pfp: userData.pfp || "",
      role: "member",
      uid: auth.currentUser.uid,
      joinedAt: new Date()
    });

    // 4. (Optional) If you track a member summary on the circle doc itself
    batch.update(circleRef, {
        memberCount: (circleSnap.data().memberCount || 0) + 1
    });

    return await batch.commit();
  }
};