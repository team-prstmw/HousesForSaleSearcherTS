import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import InteractiveList from './FacilitiesList';
import PropertyInformationList from './PropertyInformationList';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const moreInfo = {
  address: '420 Baker St, London',
  price: '$299,999',
};

const propertyInformation = {
  propertyType: 'House',
  area: '1200',
  yearBuilt: '2000',
  floor: '1',
  floorsInBuilding: 'House',
  roomsNumber: '5',
  bathroomNumber: '2',
  heating: 'Radiators',
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {moreInfo.address}
          </Typography>
          <FavoriteIcon />

          <div>Here will be slider with photos</div>

          <Typography sx={{ mt: 2 }}>{moreInfo.price}</Typography>

          <Button variant="contained" disableElevation>
            Buy House
          </Button>

          <Typography>Property information</Typography>
          <PropertyInformationList
            propertyType={propertyInformation.propertyType}
            area={propertyInformation.area}
            yearBuilt={propertyInformation.yearBuilt}
            floor={propertyInformation.floor}
            floorsInBuilding={propertyInformation.floorsInBuilding}
            roomsNumber={propertyInformation.roomsNumber}
            bathroomNumber={propertyInformation.bathroomNumber}
            heating={propertyInformation.heating}
          />

          <Typography>More facilities</Typography>
          <InteractiveList />
        </Paper>
      </Modal>
    </div>
  );
}
