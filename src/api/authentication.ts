import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { BaseError } from './Error';

export const signUpUser = async (data: any) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const document = doc(firestore, 'users', credentials.user.uid);
    await setDoc(document, { uid: credentials.user.uid, email: data.email, admin: data.admin ?? false });
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
  const user = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const data = (await getDoc(docRef)).data();
        resolve(data);
      } else {
        resolve(null);
      }
    });
  });
  return user;
};
