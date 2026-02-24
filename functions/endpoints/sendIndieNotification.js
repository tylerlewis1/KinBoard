const axios = require("axios");
const { HttpsError } = require("firebase-functions/v2/https");

module.exports = async (request) => {
  // 1. Auth Check
  if (!request.auth) {
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

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending notification:", error);
    // Use HttpsError for consistent error handling on the frontend
    throw new HttpsError("internal", error.message);
  }
};