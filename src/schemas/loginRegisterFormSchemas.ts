export default interface LoginFormFields {
  email: string;
  password: string;
}

export interface RegisterFormFields extends LoginFormFields {
  name: string;
}

export interface OnSubmitProps {
  email: string;
  password: string;
}
