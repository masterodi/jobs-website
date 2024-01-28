import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Job } from '../types';

export const getJobs = async () => {
  const q = query(collection(firestore, 'jobs'));
  const qs = await getDocs(q);
  const jobs = qs.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        application_deadline: new Date(doc.data().application_deadline),
      }) as Job,
  );
  return jobs;
};
