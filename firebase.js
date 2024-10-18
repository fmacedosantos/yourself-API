import admin from 'firebase-admin';

if (!admin.apps.length) {  
    admin.initializeApp({
        credential: admin.credential.cert("serviceAccountKey.json")
    });
}

export default admin;
