// import admin from "firebase-admin";
// import { applicationDefault, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-almFtg19Qv9KdMV8IoAhJwu7kihArnc",
  authDomain: "user-book-15496.firebaseapp.com",
  projectId: "user-book-15496",
  storageBucket: "user-book-15496.appspot.com",
  messagingSenderId: "265675383207",
  appId: "1:265675383207:web:eb2890d2a132ecb9405682"
};

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
// );

// if (!admin.apps.length) {
//   initializeAdminApp({
//     // credential: applicationDefault(),
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL
//   });
// }
// const db = admin.firestore();

// let Firebase: any;
// if (!Firebase?.apps?.length) {
//   Firebase = initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
