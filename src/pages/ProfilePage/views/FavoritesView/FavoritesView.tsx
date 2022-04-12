import axios from 'axios';
import { useState, useEffect } from 'react';
import FavoriteHouses from '../../../../components/ProfilePage/FavoriteHouses/FavoriteHouses';



const FavoritesView = () => {

  const [favorites, setFavorites] = useState<BasicHouseData[]>([]);

  const url = 'http://localhost:4000/users/my-favorites';

  useEffect(() => {
    getFavorites();
  }, [])

  const getFavorites = () => {
    axios.get<BasicHouseData[]>(`${url}`)
      .then((res) => {
        const allFavorites = res.data;
        setFavorites(allFavorites);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };
  return (
    <>
      <FavoriteHouses favorites={favorites} />
    </>
  )
};

export default FavoritesView;
