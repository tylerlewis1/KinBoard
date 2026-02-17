import { collection, doc, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

export async function voteAnnouncement(circleId, optionId, uid) {
  const announcmentDoc = doc(db, "circles", String(circleId));
  const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(announcmentsDoc);
    const data = snap.data().msgs;

    if (data.voated?.includes(uid)) throw new Error("Already voted");

    const index = data.options.findIndex(o => o.id === optionId);
    data.options[index].votes += 1;
    data.voated = [...(data.voated || []), uid];

    transaction.update(announcmentsDoc, { msgs: data });
  });
}

export async function postAnnouncement(circleId, payload) {
  const announcmentDoc = doc(db, "circles", String(circleId));
  const announcmentsDoc = doc(collection(announcmentDoc, "home"), "announcements");

  await updateDoc(announcmentsDoc, { msgs: payload });
}
