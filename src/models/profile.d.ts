import { ChangeEvent } from 'react';

export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends LoginInterface {
  name: string;
}

export interface ProfilePageInterface extends RegisterInterface {
  email?: string;
}

export interface RegisterLoginHeaderProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export interface RegisterLoginFormsProps {
  manageRequestMessage: (message: string) => void;
}

export interface LoginProps {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}
