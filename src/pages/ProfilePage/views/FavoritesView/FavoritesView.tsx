import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import FavoriteHouses from '../../../../components/ProfilePage/FavoriteHouses/FavoriteHouses';
import { useApiGet } from 'src/hooks/useApi';

const FavoritesView = () => {
  const [favorites, setFavorites] = useState<BasicHouseData[]>([]);

  const { data, isLoading }: { data: BasicHouseResponseType; isLoading: boolean } = useApiGet({
    path: '/users/my-favorites',
  });

  useEffect(() => {
    if (!isLoading) {
      const dataData = data.data;
      setFavorites(dataData);
    }
  }, [data, isLoading]);

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <FavoriteHouses favorites={favorites} />
      </Grid>
    </Grid>
  );
};

export default FavoritesView;
