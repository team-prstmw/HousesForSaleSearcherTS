import * as yup from 'yup';

import { INVALID_EMAIL_ERROR, MIN_LENGTH_ERROR, REQUIRED_ERROR, SPECIAL_CHARACTERS_ERROR } from './const';

export interface LoginSchemaInterface {
  email: string;
  password: string;
}

export interface RegisterSchemaInterface extends LoginSchemaInterface {
  name: string;
}

export interface ProfilePageSchemaInterface {
  name: string;
  password: string;
  email?: string;
}

const name = yup
  .string()
  .required(REQUIRED_ERROR)
  .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR);

export const loginSchema = yup.object().shape({
  email: yup.string().email(INVALID_EMAIL_ERROR).required(REQUIRED_ERROR),
  password: yup.string().min(6, MIN_LENGTH_ERROR).required(REQUIRED_ERROR),
});

export const registerSchema = loginSchema.shape({
  name,
});

export const profilePageSchema = yup.object({
  name,
  password: yup.string(),
});
