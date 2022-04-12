import * as yup from 'yup';

import {
  INVALID_EMAIL_ERROR,
  INVALID_PHONE_ERROR,
  MIN_LENGTH_ERROR,
  REQUIRED_ERROR,
  SPECIAL_CHARACTERS_ERROR,
} from './const';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
  phone: yup.string().matches(phoneRegExp, INVALID_PHONE_ERROR).length(9).required(REQUIRED_ERROR),
});

export const profilePageSchema = yup.object({
  name,
  password: yup.string(),
});
