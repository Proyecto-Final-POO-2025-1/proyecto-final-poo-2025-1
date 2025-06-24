import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAkhNt7OGINJdEeEHU5iNEPbdWbxbul_IU",
  authDomain: "concreteware.firebaseapp.com",
  databaseURL: "https://concreteware-default-rtdb.firebaseio.com",
  projectId: "concreteware",
  storageBucket: "concreteware.firebasestorage.app",
  messagingSenderId: "968538787293",
  appId: "1:968538787293:web:afe035a4726c410e2efa34",
  measurementId: "G-F00R0SQ8Y5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 