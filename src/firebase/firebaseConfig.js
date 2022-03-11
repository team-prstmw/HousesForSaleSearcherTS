import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCitsvLe-Yf_n2lpVF4k4FRZyoJl_Kt1Ks',
  authDomain: 'houses-for-sale-sandbox.firebaseapp.com',
  databaseURL: 'https://houses-for-sale-sandbox-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'houses-for-sale-sandbox',
  storageBucket: 'houses-for-sale-sandbox.appspot.com',
  messagingSenderId: '739311076418',
  appId: '1:739311076418:web:01def809ec8a2fee7c19db',
  measurementId: 'G-TXRBFMH77Q',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);

export default storage;
