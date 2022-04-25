/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-redeclare */
import 'react-slideshow-image/dist/styles.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Checkbox } from '@mui/material';
import { useQueryClient } from 'react-query';
import { Slide } from 'react-slideshow-image';
import { useApiDelete, useApiGet, useApiSend } from 'src/hooks/useApi';

import noPhoto from '../../../assets/images/nophoto.png';
import MoreInfoModal from '../../MoreInfoModal/MoreInfoModal';
import styles from './House.module.scss';

const label: { inputProps: { 'aria-label': string } } = { inputProps: { 'aria-label': 'Checkbox demo' } };
const House = ({ house }: { house: BasicHouseData }) => {
  const { data }: { data: BasicHouseResponseType } = useApiGet({
    path: '/users/my-favorites',
    auth: true,
  });
  const { mutateAsync: apiDelete, isSuccess: isDeleted }: { data: any } = useApiDelete({
    path: '/favorites',
    auth: true,
  });
  const { mutateAsync: apiSend } = useApiSend({ auth: true });

  const queryClient = useQueryClient();

  const slideProperties = {
    canSwipe: true,
    autoplay: false,
    arrows: true,
    transitionDuration: 700,
  };

  const favoriteObject = data?.favorites && data.favorites.filter((fav) => fav._id == house._id)?.[0];
  const isFavorite = !!favoriteObject?._id;

  const handleFavoriteAction = async () => {
    if (!isFavorite) {
      await apiSend({ path: '/favorites', data: { houseId: house._id }, method: 'post' });
      return queryClient.invalidateQueries(`/users/my-favorites`);
    }
    await apiDelete({ path: `/favorites/${favoriteObject?.favoriteId}` });
    return queryClient.invalidateQueries(`/users/my-favorites`);
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
      <MoreInfoModal id={house._id} />
      <Checkbox
        color="warning"
        {...label}
        checked={!!isFavorite}
        icon={<FavoriteBorderIcon />}
        checkedIcon={<FavoriteIcon />}
        className={styles.icon}
        onClick={handleFavoriteAction}
      />
    </Box>
  );
};

export default House;
