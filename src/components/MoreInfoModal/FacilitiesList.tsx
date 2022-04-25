/* eslint-disable react/no-array-index-key */
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import styles from './MoreInfoModal.module.scss';

const facilities = ['Garage', 'Balcony', 'Basement', 'Swimming Pool', 'Garden'];

const itemList = facilities.map((item, index) => {
  return (
    <ListItem key={index} style={{ padding: '0.1rem 0px' }}>
      <ListItemIcon style={{ minWidth: '30px' }}>
        <CheckBoxIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary={item} />
    </ListItem>
  );
});

export default function FacilitiesList() {
  return (
    <List dense className={styles.facilitiesColumn}>
      {itemList}
    </List>
  );
}
