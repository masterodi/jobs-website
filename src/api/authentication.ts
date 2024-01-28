import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { RegisterData, SigninData, User } from '../types';
import { BaseError } from './Error';

export const signUpUser = async (data: RegisterData) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const docRef = doc(firestore, 'users', credentials.user.uid);
    const docData = { uid: credentials.user.uid, email: data.email, admin: false };
    await setDoc(docRef, docData);
    return docData;
  } catch (e) {
    throw BaseError.maybeFromFirebase(e);
  }
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signInUser = async (data: SigninData) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
    return credentials;
  } catch (e) {
    throw BaseError.maybeFromFirebase(e);
  }
};

export const getSession = async () => {
  const user = new Promise<User | null>((resolve, _) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const data = (await getDoc(docRef)).data() as User;
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
  return user;
};
