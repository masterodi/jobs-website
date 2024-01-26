import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';

export const getJobs = async () => {
  const q = query(collection(firestore, 'jobs'));
  const qs = await getDocs(q);
  const jobs = qs.docs.map((doc) => doc.data());
  return jobs;
};
