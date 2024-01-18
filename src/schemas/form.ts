import { object, string } from 'yup';

export const signinSchema = object({ email: string().required().email(), password: string().required() });

export const registerSchema = object({ email: string().required().email(), password: string().required() });
