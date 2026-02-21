const { onCall, HttpsError, onRequest } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage"); // Added for Storage
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();

exports.recursiveDeleteCollection = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "User must be logged in.");
    }

    const circleId = String(request.data.id);
    const userId = request.auth.uid;
    
    const db = getFirestore();
    const bucket = getStorage().bucket(); // Get default storage bucket

    try {
        // 1. Remove ID from User's array
        const userRef = db.collection("users").doc(userId);
        await userRef.update({
            circles: FieldValue.arrayRemove(Number(circleId))
        });

        // 2. Delete Storage Folder (images/circles/[id])
        // deleteFiles() searches for all files with that prefix
        const folderPath = `images/circles/${circleId}/`;
        await bucket.deleteFiles({ prefix: folderPath });

        // 3. Perform Recursive Firestore Delete
        const circleRef = db.collection("circles").doc(circleId);
        await db.recursiveDelete(circleRef);

        return { success: true, id: circleId };
    } catch (error) {
        console.error("Total Cleanup failed:", error);
        throw new HttpsError("internal", "Failed to fully remove circle and assets.");
    }
});
exports.sendIndieNotification = onCall({ secrets: ["NATIVE_NOTIFY_TOKEN"] }, async (request) => {
  if(!request.auth){
     throw new HttpsError("unauthenticated", "User must be logged in.");
  }
    try {
    const token = process.env.NATIVE_NOTIFY_TOKEN;
    const id = request.data.id;
    const response = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: id,
      appId: 33378,
      appToken: token,
      title: 'Hello!',
      message: 'This is a test push notification'
    });

    return{ success: true, data: response.data };
  } catch (error) {
    console.error("Error sending notification:", error);
    return{ success: false, error: error.message };
  }
});

exports.sendAnnouncmentNotification = onCall({ secrets: ["NATIVE_NOTIFY_TOKEN"] }, async (request) => {
  if(!request.auth){
     throw new HttpsError("unauthenticated", "User must be logged in.");
  }
    try {
        const db = getFirestore();
        const token = process.env.NATIVE_NOTIFY_TOKEN;
        const circleID = request.data.id;
        const title = request.data.title;
        const msg = request.data.msg;
        const sender = request.data.sender || null;
        const membersRef = db.collection('circles').doc(circleID).collection('members');
        const snapshot = await membersRef.get();
        if (snapshot.empty) {
            return;
        }
        let memberIds = snapshot.docs.map(doc => doc.id);
        memberIds = memberIds.filter(id => id !== sender);
        const response = await axios.post(`https://app.nativenotify.com/api/indie/group/notification`, {
            subIDs: memberIds,
            appId: 33378,
            appToken: token,
            title: title,
            message: msg
        });

        return{ success: true, data: response.data };
  } catch (error) {
    console.error("Error sending notification:", error);
    return{ success: false, error: error.message };
  }
});
