const axios = require("axios");
const { getFirestore } = require("firebase-admin/firestore");
const { HttpsError } = require("firebase-functions/v2/https");

module.exports = async (request) => {
  // 1. Auth check
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in.");
  }

  try {
    const db = getFirestore();
    const token = process.env.NATIVE_NOTIFY_TOKEN;
    
    // Destructure request data
    const { id: circleID, title, msg, sender = null } = request.data;

    // 2. Fetch members of the circle
    const membersRef = db.collection('circles').doc(circleID).collection('members');
    const snapshot = await membersRef.get();

    if (snapshot.empty) {
      return { success: true, message: "No members to notify" };
    }

    // 3. Filter out the sender so they don't get a notification for their own message
    let memberIds = snapshot.docs.map(doc => doc.id);
    memberIds = memberIds.filter(id => id !== sender);

    if (memberIds.length === 0) {
      return { success: true, message: "No recipients after filtering" };
    }

    // 4. Send group notification via Native Notify
    const response = await axios.post(`https://app.nativenotify.com/api/indie/group/notification`, {
      subIDs: memberIds,
      appId: 33378,
      appToken: token,
      title: title,
      message: msg
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending group notification:", error);
    throw new HttpsError("internal", error.message);
  }
};