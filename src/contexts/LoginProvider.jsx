import PropTypes from 'prop-types';
import { useState } from 'react';

import LoginContext from './LoginContext';

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('isloggedIn', true);
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
