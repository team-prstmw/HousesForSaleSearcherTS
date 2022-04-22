import { List, ListItem, ListItemText } from '@mui/material';

import styles from './MoreInfoModal.module.scss';

interface PropertyInformation {
  propertyType: string;
  area: string;
  yearBuilt: string;
  floor: string;
  floorsInBuilding: string;
  roomsNumber: string;
  bathroomNumber: string;
  heating: string;
}

function PropertyInformationList({
  propertyType,
  area,
  yearBuilt,
  floor,
  floorsInBuilding,
  roomsNumber,
  bathroomNumber,
  heating,
}: PropertyInformation) {
  return (
    <List dense className={styles.propInfoColumn}>
      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="TYPE OF PROPERTY" secondary={propertyType} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="YEAR BUILT" secondary={yearBuilt} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="FLOORS IN BUILDING" secondary={floorsInBuilding} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="NUMBER OF BATHROOMS" secondary={bathroomNumber} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="DIMENSION (SQFT)" secondary={area} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="FLOOR" secondary={floor} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="NUMBER OF ROOMS" secondary={roomsNumber} />
      </ListItem>

      <ListItem divider style={{ paddingLeft: '0px' }}>
        <ListItemText primary="HEATING" secondary={heating} />
      </ListItem>
    </List>
  );
}

export default PropertyInformationList;
