var admin = require("firebase-admin");

var serviceAccount = require("../config/virtus-bookstore-firebase-adminsdk-k8exc-11c2313ef4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
