import { InferType } from 'yup';
import { jobSchema, registerSchema, signinSchema, userSchema } from './schemas';

export type User = InferType<typeof userSchema>;
export type Job = InferType<typeof jobSchema>;
export type SigninData = InferType<typeof signinSchema>;
export type RegisterData = InferType<typeof registerSchema>;
export type JobsOrder = 'JOBS_ORDER:JOB_TITLE:ASC' | 'JOBS_ORDER:JOB_TITLE:DESC';
