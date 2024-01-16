// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQQ4bbLHtL7cQds7d2jFYmUXZyORPNByo',
  authDomain: 'jobs-website-6f8c8.firebaseapp.com',
  projectId: 'jobs-website-6f8c8',
  storageBucket: 'jobs-website-6f8c8.appspot.com',
  messagingSenderId: '420022124386',
  appId: '1:420022124386:web:fac07d46e7dfb150bb363b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
