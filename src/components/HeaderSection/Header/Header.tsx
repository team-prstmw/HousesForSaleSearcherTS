import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import Logo from 'src/assets/images/NavLogo.png';
import AccountMenu from 'src/components/HeaderSection/AccountMenu/AccountMenu';
import ThemeSwitcher from 'src/components/HeaderSection/Switcher';
import LoginContext from 'src/contexts/LoginContext';

import { signOut } from '@/api/auth/signOut';

import RegisterLoginModal from '../../SignInSignUpModal/RegisterLoginModal/RegisterLoginModal';
import styles from './Header.module.scss';

function Header() {
  const [logged, setLogged] = useState<boolean | string>(false);
  const login = useContext(LoginContext);
  useEffect(() => {
    setLogged(localStorage.getItem('isloggedIn') || login.loggedIn);
  }, [login.loggedIn]);
  return (
    <Box
      component="div"
      className={styles.topBarContainer}
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <ThemeSwitcher className={styles.switch} />
      <a href="/">
        <Box component="img" src={Logo} />
      </a>
      {logged ? <AccountMenu /> : <RegisterLoginModal />}
    </Box>
  );
}

export default Header;
