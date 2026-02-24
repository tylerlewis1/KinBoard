const { onCall, HttpsError, onRequest } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage"); // Added for Storage
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();

const recursiveDeleteLogic = require("./endpoints/recursiveDeleteCollection");
const sendIndieLogic = require("./endpoints/sendIndieNotification");
const sendAnnouncmentNotification = require("./endpoints/sendAnnouncementNotification");
const removeUserLogic = require("./endpoints/removeUser");

exports.recursiveDeleteCollection = onCall(recursiveDeleteLogic);

exports.sendIndieNotification = onCall(
  { secrets: ["NATIVE_NOTIFY_TOKEN"] }, 
  sendIndieLogic
);

exports.sendAnnouncmentNotification = onCall(
  { secrets: ["NATIVE_NOTIFY_TOKEN"] }, 
  sendAnnouncmentNotification
);

exports.removeUser = onCall(removeUserLogic);