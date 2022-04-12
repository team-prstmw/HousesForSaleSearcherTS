import { List, ListItem, ListItemText } from '@mui/material';

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

function PropertyInformationList(props: PropertyInformation) {
  const { propertyType, area, yearBuilt, floor, floorsInBuilding, roomsNumber, bathroomNumber, heating } = props;
  return (
    <List dense>
      <ListItem divider>
        <ListItemText primary="TYPE OF PROPERTY" secondary={propertyType} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="YEAR BUILT" secondary={yearBuilt} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="FLOORS IN BUILDING" secondary={floorsInBuilding} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="NUMBER OF BATHROOMS" secondary={bathroomNumber} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="DIMENSION (SQFT)" secondary={area} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="FLOOR" secondary={floor} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="NUMBER OF ROOMS" secondary={roomsNumber} />
      </ListItem>

      <ListItem divider>
        <ListItemText primary="HEATING" secondary={heating} />
      </ListItem>
    </List>
  );
}

export default PropertyInformationList;
