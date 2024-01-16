import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

export const signUpUser = async (data: any) => {
  const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
  return credentials;
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signInUser = async (data: any) => {
  const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
  return credentials;
};

export const getSession = async () => {
  const user = new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(null);
      }
    });
  });
  return user;
};
