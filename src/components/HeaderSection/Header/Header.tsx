import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import Logo from 'src/assets/images/NavLogo.png';
import AccountMenu from 'src/components/HeaderSection/AccountMenu/AccountMenu';
import ThemeSwitcher from 'src/components/HeaderSection/Switcher';
import RegisterLoginModal from 'src/components/RegisterLoginModal/RegisterLoginModal';
import LoginContext from 'src/contexts/LoginContext';

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
      <Box component="img" src={Logo} />
      {logged ? <AccountMenu /> : <RegisterLoginModal />}
    </Box>
  );
}

export default Header;
