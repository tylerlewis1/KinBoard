const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { HttpsError } = require("firebase-functions/v2/https");

module.exports = async (request) => {
  // 1. Auth Check
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  try {
    const db = getFirestore();
    const circleId = String(request.data.cid);
    const userId = String(request.data.uid);

    const userRef = db.collection("users").doc(userId);
    const memberDoc = db.collection("circles").doc(circleId).collection("members").doc(userId);

    // Use a batch to ensure both operations succeed together
    const batch = db.batch();

    // Remove the circle ID from the user's circle list
    batch.update(userRef, {
      circles: FieldValue.arrayRemove(Number(circleId))
    });

    // Delete the member document from the circle's sub-collection
    batch.delete(memberDoc);

    await batch.commit();

    return { success: true };
  } catch (e) {
    console.error("Error removing user:", e);
    throw new HttpsError("internal", e.message);
  }
};