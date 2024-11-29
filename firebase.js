const admin = require('firebase-admin');

if (!admin.apps.length) {  
    admin.initializeApp({
        credential: admin.credential.cert("serviceAccountKey.json")
    });
}

module.exports = admin;