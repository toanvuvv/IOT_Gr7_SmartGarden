const admin = require("firebase-admin");
const serviceAccount = require("./creds.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://${serviceAccount.project_id}.firebaseio.com",
});

const db = admin.firestore();
export const User = db.collection("Users");
export const DataEsp32 = db.collection("DataEsp32");
export const control = db.collection("control");
export const history = db.collection("history");
export const user = db.collection("user");
export const schedule = db.collection("schedule");
