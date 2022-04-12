import CheckBoxIcon from '@mui/icons-material/CheckBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const facilities = ['Garage', 'Balcony', 'Basement', 'Swimming Pool', 'Garden'];

const itemList = facilities.map((item) => {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckBoxIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary={item} />
    </ListItem>
  );
});

export default function InteractiveList() {
  return <List dense>{itemList}</List>;
}
