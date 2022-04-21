import { Box, Button } from '@mui/material';
import noPhoto from '../../../assets/images/nophoto.png';
import styles from '../../HomePage/ListOfHouses/ListOfHouses.module.scss';

const FavoriteHouses = ({ favorites }: { favorites: BasicHouseData[] }) => {
  const displayFavorites = (favorites: BasicHouseData[]) => {
    if (favorites.length > 0) {
      return favorites.map((favorite: BasicHouseData, i) => {
        return (
          <Box component="div" className={styles.houseElement} key={i}>
            <h4>
              {favorite.city}, {favorite.streetName} {favorite.streetNumber}
            </h4>
            <p className={styles.price}>
              {favorite.price}zł/m<sup>2</sup>
            </p>
            <img
              src={favorite.photo_0 ? favorite.photo_0 : noPhoto}
              alt={`House in ${favorite.city} at ${favorite.streetName}`}
            />
            <p className={styles.shortInfo}>{favorite.descriptionField}</p>
            <Button className={styles.moreInfo}>more info</Button>
          </Box>
        );
      });
    } else {
      return (
        <Box component="div" className={styles.housesList}>
          <h3>You have no favorites yet</h3>
        </Box>
      );
    }
  };
  return (
    <Box component="div" className={styles.housesList}>
      {displayFavorites(favorites)}
    </Box>
  );
};

export default FavoriteHouses;
