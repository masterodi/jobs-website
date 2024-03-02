import { array, bool, date, number, object, string } from 'yup';

export const userSchema = object({ uid: string().required(), email: string().required(), admin: bool().required() });

export const signinSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export const registerSchema = object({ email: string().required().email(), password: string().required() });

export const jobSchema = object({
  application_deadline: date().required(),
  company_name: string().required(),
  contact_email: string().required(),
  currency: string().required(),
  education_level: string().required(),
  employment_type: string().required(),
  id: string().required(),
  industry: string().required(),
  job_description: string().required(),
  job_title: string().required(),
  location: string().required(),
  pay_period: string().required(),
  required_skills: array(string().required()).required(),
  requirements: string().required(),
  salary: number().required(),
  years_experience: number().required(),
  created_at: number().required(),
});
