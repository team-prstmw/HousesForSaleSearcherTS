/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-redeclare */
import 'react-slideshow-image/dist/styles.css';

import DoneIcon from '@mui/icons-material/Done';
import House from '../House/House';
import { Autocomplete, Box, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';

import styles from './ListOfHouses.module.scss';

const options = ['Payment (Low to High)', 'Payment (High to Low)', 'A-Z', 'Z-A'] as const;

function ListOfHouses({ houses }: { houses: BasicHouseData[] }) {
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortedHouses, setSortedHouses] = useState<BasicHouseData[]>([]);

  const handleDelete = () => {
    setSortType(null);
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
        {sortedHouses.map((item: BasicHouseData) => (
          <House house={item} key={item._id} />
        ))}
      </Box>
    </Box>
  );
}

export default ListOfHouses;
