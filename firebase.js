const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-35f39-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;
