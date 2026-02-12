const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage"); // Added for Storage
const admin = require("firebase-admin");

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
