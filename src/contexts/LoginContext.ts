import { createContext } from 'react';

interface UserManagment {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: UserData;
}
const LoginContext = createContext<UserManagment>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
  user: { _id: '', avatar: '', cash: undefined, email: '', name: '', phone: undefined },
});

export default LoginContext;
