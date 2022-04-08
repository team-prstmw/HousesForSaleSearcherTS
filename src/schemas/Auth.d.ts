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
