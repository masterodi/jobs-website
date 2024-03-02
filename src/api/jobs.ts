import { OrderByDirection, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Job, JobsOrder } from '../types';

export const JOBS_ORDER = {
  JOB_TITLE: { ASC: 'JOBS_ORDER:JOB_TITLE:ASC', DESC: 'JOBS_ORDER:JOB_TITLE:DESC' },
};

export const getJobs = async (filters?: {
  order?: JobsOrder;
  skills?: string[];
  industries?: string[];
  employmentTypes?: string[];
}) => {
  let q = query(collection(firestore, 'jobs'));

  let o = { by: 'job_title', dir: 'asc' };

  if (filters) {
    const { order, skills, industries, employmentTypes } = filters;

    if (order === 'JOBS_ORDER:JOB_TITLE:ASC') {
      o = { by: 'job_title', dir: 'asc' };
    }

    if (order === 'JOBS_ORDER:JOB_TITLE:DESC') {
      o = { by: 'job_title', dir: 'desc' };
    }

    if (o) {
      q = query(q, orderBy(o.by, o.dir as OrderByDirection));
    }

    if (skills && skills.length) {
      q = query(q, where('required_skills', 'array-contains-any', skills));
    }

    if (industries && industries.length) {
      q = query(q, where('industry', 'in', industries));
    }

    if (employmentTypes && employmentTypes.length) {
      q = query(q, where('employment_type', 'in', employmentTypes));
    }
  }

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

export const getJobsSkills = async () => {
  const jobs = await getJobs();
  const skills = [] as string[];

  for (const job of jobs) {
    const { required_skills } = job;

    for (const skill of required_skills) {
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    }
  }

  return skills.sort();
};

export const getJobsIndustries = async () => {
  const jobs = await getJobs();
  const industries = [] as string[];

  for (const job of jobs) {
    const { industry } = job;

    if (!industries.includes(industry)) {
      industries.push(industry);
    }
  }

  return industries.sort();
};

export const getJobsEmploymentTypes = async () => {
  const jobs = await getJobs();
  const types = [] as string[];

  for (const job of jobs) {
    const { employment_type } = job;

    if (!types.includes(employment_type)) {
      types.push(employment_type);
    }
  }

  return types.sort();
};
