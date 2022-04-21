import axios from 'axios';
import Grid from '@mui/material/Grid';
import { readAll } from 'src/firebase';
import { useState, useEffect } from 'react';
import FavoriteHouses from '../../../../components/ProfilePage/FavoriteHouses/FavoriteHouses';

const FavoritesView = () => {
  const [favorites, setFavorites] = useState<BasicHouseData[]>([]);

  // GET DATA FROM FIREBASE (TRY OUT) - DELETE AFTER SUCCESSFULLY PUTTING DATA ON THE SERVER
  const fetchHouses = async () => {
    const fetchedHouses = await readAll('houses');
    setFavorites(() => fetchedHouses);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // AXIOS FETCH DATA FROM SERVER - USE IT WHEN IT ALL WORKS
  // const url = 'http://localhost:4000/users/my-favorites';

  // useEffect(() => {
  //   getFavorites();
  // }, [])

  // const getFavorites = () => {
  //   axios.get<BasicHouseData[]>(`${url}`)
  //     .then((res) => {
  //       const allFavorites = res.data;
  //       setFavorites(allFavorites);
  //     })
  //     .catch((err) => console.error(`Error: ${err}`));
  // };
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <FavoriteHouses favorites={favorites} />
      </Grid>
    </Grid>
  );
};

export default FavoritesView;
