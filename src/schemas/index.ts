import { bool, date, object, string } from 'yup';

export const userSchema = object({ uid: string().required(), email: string().required(), admin: bool().required() });

export const signinSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export const registerSchema = object({ email: string().required().email(), password: string().required() });

export const jobSchema = object({
  id: string().required(),
  job_title: string().required(),
  company_name: string().required(),
  location: string().required(),
  salary: string().required(),
  job_description: string().required(),
  requirements: string().required(),
  education: string().required(),
  experience: string().required(),
  employment_type: string().required(),
  application_deadline: date().required(),
});
