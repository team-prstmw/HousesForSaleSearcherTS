/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useApiGet } from 'src/hooks/useApi';

import FavoriteHouses from '../../../../components/ProfilePage/FavoriteHouses/FavoriteHouses';

const FavoritesView = () => {
  const [favorites, setFavorites] = useState<BasicHouseData[]>([]);

  const { data, isSuccess }: { data: BasicHouseResponseType; isSuccess: boolean } = useApiGet({
    path: '/users/my-favorites',
    auth: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const dataData = data?.favorites;
      setFavorites(dataData);
    }
  }, [data, isSuccess]);

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} md={12}>
        <FavoriteHouses favorites={favorites} />
      </Grid>
    </Grid>
  );
};

export default FavoritesView;
