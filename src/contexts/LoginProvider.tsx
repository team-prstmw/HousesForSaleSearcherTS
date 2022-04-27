import { FC, useEffect, useState } from 'react';
import { useApiGet } from 'src/hooks/useApi';

import LoginContext from './LoginContext';

const LoginProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>({
    _id: '',
    avatar: '',
    cash: undefined,
    email: '',
    name: '',
    phone: undefined,
  });

  const { data, isLoading }: { data: UserData } = useApiGet({ path: `/users`, auth: true });

  useEffect(() => {
    if (!isLoading) {
      const dataData = data;
      setUser(dataData);
    }
  }, [data, isLoading]);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('isloggedIn', 'true');
  };
  const logout = () => {
    localStorage.removeItem('isloggedIn');
    setLoggedIn(false);
  };

  return <LoginContext.Provider value={{ loggedIn, login, logout, user }}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
