/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/HeaderSection/Header/Header';
import ChangeView from 'src/components/HomePage/ChangeView/ChangeView';
import ListOfHouses from 'src/components/HomePage/ListOfHouses/ListOfHouses';
import MapHouses from 'src/components/HomePage/MapSide/MapSide';

function HomePage() {
  const [toggleView, setToggleView] = useState<boolean>(true);
  const [houses, setHouses] = useState<BasicHouseData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAsyncAction = async (asyncAction: () => Promise<void>) => {
    setLoading(() => true);
    try {
      await asyncAction();
    } catch (caughtError: unknown) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchHouses = async () => {
    await handleAsyncAction(async () => {
      const resp = await axios.get<BasicHouseResponseType>('http://localhost:4000/api/houses');
      setHouses(resp.data.data);
    });
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column' }} height="100vh">
      <Grid item xs={12} marginBottom="38px" sx={{ flexBasis: { xs: '0' } }}>
        <Header />
      </Grid>
      <Box
        component="div"
        sx={{
          display: { md: 'flex' },
          maxWidth: '1750px',
          flexBasis: '100%',
          margin: { md: 'auto' },
        }}
      >
        <Grid item xs={12} md={6} sx={{ display: { xs: toggleView ? 'block' : 'none', md: 'block' } }}>
          <MapHouses houses={houses} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: toggleView ? 'none' : 'block', md: 'block' } }}>
          <ListOfHouses houses={houses} />
        </Grid>
      </Box>
      <Grid item xs={12} marginTop="28px" sx={{ flexBasis: { xs: '0' } }}>
        <ChangeView toggleView={toggleView} setToggleView={setToggleView} />
        <Footer />
      </Grid>
    </Grid>
  );
}

export default HomePage;
