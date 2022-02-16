import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAsWY-MSnSAMDskBmWXHqnviqsDLUqOaik",
  authDomain: "netflixme-80443.firebaseapp.com",
  projectId: "netflixme-80443",
  storageBucket: "netflixme-80443.appspot.com",
  messagingSenderId: "827727044575",
  appId: "1:827727044575:web:87e51de1936601fb7bee6a"
};
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
export const firestore = getFirestore(app)