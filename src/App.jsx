import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import theme from '/src/theme/theme';

import LoginProvider from './contexts/LoginProvider';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AccountSettingsView from './pages/ProfilePage/views/AccountSettingsView/AccountSettingsView';
import SellHouseView from './pages/ProfilePage/views/SellHouseView/SellHouseView';

function App() {
  const MAP_INIT = `https://maps.googleapis.com/maps/api/js?key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }&callback=initMap`;

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <LoginProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={localStorage.getItem('isloggedIn') ? <ProfilePage /> : <Navigate to="/" />}>
                <Route path="" exact element={<AccountSettingsView />} />
                <Route path="favourites" exact element={<div>favorites</div>} />
                <Route path="my-houses" exact element={<div>my house</div>} />
                <Route path="sell-house" exact element={<SellHouseView />} />
              </Route>
            </Routes>
          </LoginProvider>
        </ThemeProvider>
        <script async defer src={MAP_INIT} />
      </div>
    </BrowserRouter>
  );
}

export default App;
