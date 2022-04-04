import PropTypes from 'prop-types';
import React, { useState } from 'react';

import LoginContext from './LoginContext';

const LoginProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('isloggedIn', 'true'); // Zmieniłem true na string
  };
  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return <LoginContext.Provider value={{ loggedIn, login, logout }}>{children}</LoginContext.Provider>;
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
