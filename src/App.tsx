import { ThemeProvider } from '@mui/material/styles';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';
import AccountSettingsView from 'src/pages/ProfilePage/views/AccountSettingsView/AccountSettingsView';
import SellHouseView from 'src/pages/ProfilePage/views/SellHouseView/SellHouseView';
import theme from 'src/theme/theme';
import FavoritesView from 'src/pages/ProfilePage/views/FavoritesView/FavoritesView';

import LoginProvider from './contexts/LoginProvider';
import HomePage from './pages/HomePage';

function App(): ReactElement {
  const MAP_INIT = `https://maps.googleapis.com/maps/api/js?key=${
    import.meta.env.VITE_GOOGLE_API_KEY as string
  }&callback=initMap`;

  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <LoginProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/user"
                  element={localStorage.getItem('isloggedIn') ? <ProfilePage /> : <Navigate to="/" />}
                >
                  <Route path="" element={<AccountSettingsView />} />
                  <Route path="favourites" element={<FavoritesView />} />
                  <Route path="my-houses" element={<div>my house</div>} />
                  <Route path="sell-house" element={<SellHouseView />} />
                </Route>
              </Routes>
            </LoginProvider>
          </ThemeProvider>
        </QueryClientProvider>
        <script async defer src={MAP_INIT} />
      </div>
    </BrowserRouter>
  );
}

export default App;
