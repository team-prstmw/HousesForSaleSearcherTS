import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';

import Logo from '/src/assets/images/NavLogo.png';
import ThemeSwitcher from '/src/components/HeaderSection/Switcher';
import RegisterLoginModal from '/src/components/RegisterLoginModal/RegisterLoginModal';
import LoginContext from '/src/contexts/LoginContext';

import styles from './Header.module.scss';

function Header() {
  const [logged, setLogged] = useState(false);
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
      {logged ? (
        <Button
          onClick={() => {
            login.logout();
            setLogged(false);
          }}
          sx={{
            marginRight: { xs: '0.8rem', md: '3rem', lg: '3.75rem' },
            width: { xs: '80px', md: '105px', lg: '130px' },
            height: { xs: '35px', md: '45px', lg: '55px' },
            fontSize: { xs: '14px', md: '17px', lg: '20px' },
            padding: { xs: '0px', md: '5px 7px', lg: '10px 14px' },
          }}
        >
          Sign out
        </Button>
      ) : (
        <RegisterLoginModal />
      )}
    </Box>
  );
}

export default Header;
