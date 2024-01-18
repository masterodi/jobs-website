import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { BaseError } from './Error';

export const signUpUser = async (data: any) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    return credentials;
  } catch (e) {
    throw BaseError.maybeFromFirebase(e);
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signInUser = async (data: any) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
    return credentials;
  } catch (e) {
    throw BaseError.maybeFromFirebase(e);
  }
};

export const getSession = async () => {
  const user = new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
  return user;
};
