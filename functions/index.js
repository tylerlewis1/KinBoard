const { onCall, HttpsError, onRequest } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage"); // Added for Storage
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();

const recursiveDeleteLogic = require("./endpoints/recursiveDeleteCollection");
exports.recursiveDeleteCollection = onCall(recursiveDeleteLogic);


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

exports.removeUser = onCall(async (request) => {
  if(!request.auth){
     throw new HttpsError("unauthenticated", "User must be logged in.");
  }
  try{
    const circleId = String(request.data.cid);
    const userId = String(request.data.uid);
    const db = getFirestore();
    const userRef = db.collection("users").doc(userId);
    const memberDoc = db.collection("circles").doc(circleId).collection("members").doc(userId);
    //remove from user
    await userRef.update({
        circles: FieldValue.arrayRemove(Number(circleId))
    });
    await memberDoc.delete();

    return{ success: true};
  } catch(e){
    console.log(e);
    return{ success: false, error: e };
  }
});
