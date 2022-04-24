import { Box, Button, Checkbox } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import noPhoto from '../../../assets/images/nophoto.png';
import styles from './House.module.scss';

const label: { inputProps: { 'aria-label': string } } = { inputProps: { 'aria-label': 'Checkbox demo' } };
const House = ({ house }: { house: BasicHouseData }) => {
  return (
    <Box component="div" className={styles.houseElement}>
      <h4>
        {house.city}, {house.streetName} {house.streetNumber}
      </h4>
      <p className={styles.price}>
        {house.price}zł/m<sup>2</sup>
      </p>
      <img src={house.photo_0 ? house.photo_0 : noPhoto} alt={`House in ${house.city} at ${house.streetName}`} />
      <p className={styles.shortInfo}>{house.descriptionField}</p>
      <Button className={styles.moreInfo}>more info</Button>
      <Checkbox
        color="warning"
        {...label}
        icon={<FavoriteBorderIcon />}
        checkedIcon={<FavoriteIcon />}
        className={styles.icon}
      />
    </Box>
  );
};

export default House;
