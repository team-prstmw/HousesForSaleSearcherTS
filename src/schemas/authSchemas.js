import * as yup from 'yup';

import { INVALID_EMAIL_ERROR, MIN_LENGTH_ERROR } from '/src/schemas/const';

import { REQUIRED_ERROR, SPECIAL_CHARACTERS_ERROR } from './validationMessages';

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
