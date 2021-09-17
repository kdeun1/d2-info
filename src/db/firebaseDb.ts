import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, get, child,
} from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});
const firebaseDb = getDatabase(firebaseApp);

const dbRef = ref(firebaseDb);

const getTest = () => get(child(dbRef, 'test'));

const getDestinyActivityDefinition = async (destinyActivityDefinitionId: number) => {
  try {
    const snapshot = await get(child(dbRef, `DestinyActivityDefinition/${destinyActivityDefinitionId}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
    }
  } catch (e) {
    console.log(e);
  }
};

export {
  getTest,
  getDestinyActivityDefinition,
};
