const admin = require("firebase-admin");

admin.initializeApp({
  databaseURL: "https://projeto-35f39-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;


