import { createContext } from 'react';

const LoginContext = createContext({ loggedIn: false, login: () => {}, logout: () => {} });

export default LoginContext;
