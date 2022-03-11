import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    location.pathname === ('/user' || '/user/') ? '/user' : location.pathname.split('/user/')[1]
  );

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(newValue);
  };

  return (
    <div>
      <Container component={Paper} maxWidth={false} className={styles.container}>
        <div className={styles.headerContainer}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ maxWidth: 'max-content', margin: '0 auto' }}
            >
              <Tab value="/user" label="Account Settings" />
              <Tab value="favourites" label="Favourites" />
              <Tab value="my-houses" label="My Houses" />
              <Tab value="sell-house" label="Sell House +" />
            </Tabs>
          </Box>
        </div>
        <Outlet />
      </Container>
    </div>
  );
};

export default ProfilePage;
