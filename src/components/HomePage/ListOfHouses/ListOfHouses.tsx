/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-redeclare */
import 'react-slideshow-image/dist/styles.css';

import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Autocomplete, Box, Button, Checkbox, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import noPhoto from 'src/assets/images/nophoto.png';

import styles from './ListOfHouses.module.scss';

const options = ['Payment (Low to High)', 'Payment (High to Low)', 'A-Z', 'Z-A'] as const;
const label: { inputProps: { 'aria-label': string } } = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ListOfHouses({ houses }: { houses: BasicHouseData[] }) {
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortedHouses, setSortedHouses] = useState<BasicHouseData[]>([]);

  const handleDelete = () => {
    setSortType(null);
  };

  const slideProperties = {
    canSwipe: true,
    autoplay: false,
    arrows: true,
    transitionDuration: 700,
  };

  useEffect(() => {
    const itemArray = houses.map((item) => item);
    if (sortType === 'Payment (Low to High)') {
      const sorted = [...itemArray].sort((a, b) => a.price - b.price);
      setSortedHouses(sorted);
    }
    if (sortType === 'Payment (High to Low)') {
      const sorted = [...itemArray].sort((a, b) => b.price - a.price);
      setSortedHouses(sorted);
    }
    if (sortType === 'A-Z') {
      const sorted = [...itemArray].sort((a, b) => a.city.localeCompare(b.city));
      setSortedHouses(sorted);
    }
    if (sortType === 'Z-A') {
      const sorted = [...itemArray].sort((a, b) => b.city.localeCompare(a.city));
      setSortedHouses(sorted);
    }
    if (sortType === null) {
      setSortedHouses(itemArray);
    }
  }, [houses, sortType]);

  return (
    <Box component="div" className={styles.housesComponent}>
      <Box component="div" className={styles.sortBy}>
        <div>
          <span>Sort by</span>
          <Autocomplete
            className={styles.options}
            disableClearable
            value={sortType ?? ''}
            onChange={(event, newValue) => {
              setSortType(newValue);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <Chip
          icon={<DoneIcon />}
          sx={{ display: sortType !== null ? '' : 'none' }}
          label={`${sortType !== null ? sortType : ''}`}
          onDelete={handleDelete}
        />
      </Box>
      <Box component="div" className={styles.housesList}>
        {sortedHouses.map((item: BasicHouseData) => {
          if (item.images.length === 0) {
            item.images.push(noPhoto);
          }
          if (item.images.length === 1) {
            slideProperties.arrows = false;
            slideProperties.canSwipe = false;
          }
          return (
            <Box component="div" className={styles.houseElement} key={item._id}>
              <h4>
                {item.city}, {item.street} {item.houseNr}
              </h4>
              <p className={styles.price}>
                {item.price}zł/m<sup>2</sup>
              </p>
              <Slide {...slideProperties}>
                {item.images.map((image) => {
                  return (
                    <div className="each-slide" key={image}>
                      <img src={image} alt="House" />
                    </div>
                  );
                })}
              </Slide>
              <p className={styles.shortInfo}>{item.descriptionField}</p>
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
        })}
      </Box>
    </Box>
  );
}

export default ListOfHouses;
