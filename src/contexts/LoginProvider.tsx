import { FC, useState } from 'react';

import LoginContext from './LoginContext';

const LoginProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('isloggedIn', true.toString());
  };
  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return <LoginContext.Provider value={{ loggedIn, login, logout }}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
