import { Box } from '@mui/material';
import House from '../../HomePage/House/House';
import styles from '../../HomePage/ListOfHouses/ListOfHouses.module.scss';

const FavoriteHouses = ({ favorites }: { favorites: BasicHouseData[] }) => {
  const displayFavorites = (usersFavorite: BasicHouseData[]) => {
    if (usersFavorite.length > 0) {
      return usersFavorite.map((favorite: BasicHouseData, i) => {
        return <House house={favorite} key={i} />;
      });
    } else {
      return (
        <Box component="div" className={styles.favoritesList}>
          <h3>You have no favorites yet</h3>
        </Box>
      );
    }
  };
  return (
    <Box component="div" className={styles.favoritesList}>
      {displayFavorites(favorites)}
    </Box>
  );
};

export default FavoriteHouses;
