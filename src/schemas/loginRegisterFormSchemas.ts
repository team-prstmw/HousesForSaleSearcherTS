export default interface LoginFormFields {
  email: string;
  password: string;
}

export interface RegisterFormFields extends LoginFormFields {
  name: string;
  phone: string;
}

export interface OnSubmitProps {
  email: string;
  password: string;
}
