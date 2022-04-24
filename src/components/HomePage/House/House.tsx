/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-redeclare */
import 'react-slideshow-image/dist/styles.css';
import { Box, Button, Checkbox } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import noPhoto from '../../../assets/images/nophoto.png';
import styles from './House.module.scss';
import MoreInfoModal from '../../MoreInfoModal/MoreInfoModal';
import { Slide } from 'react-slideshow-image';

const label: { inputProps: { 'aria-label': string } } = { inputProps: { 'aria-label': 'Checkbox demo' } };
const House = ({ house }: { house: BasicHouseData }) => {
  const slideProperties = {
    canSwipe: true,
    autoplay: false,
    arrows: true,
    transitionDuration: 700,
  };
  return (
    <Box component="div" className={styles.houseElement}>
      <h4>
        {house.city}, {house.street} {house.houseNr}
      </h4>
      <p className={styles.price}>
        {house.price}zł/m<sup>2</sup>
      </p>
      <Slide {...slideProperties}>
        {house.images.map((image) => {
          if (house.images.length === 0) {
            house.images.push(noPhoto);
          }
          if (house.images.length === 1) {
            slideProperties.arrows = false;
            slideProperties.canSwipe = false;
          }
          return (
            <div className="each-slide" key={image}>
              <img src={image} alt="House" />
            </div>
          );
        })}
      </Slide>
      <p className={styles.shortInfo}>{house.descriptionField}</p>
      <MoreInfoModal />
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
