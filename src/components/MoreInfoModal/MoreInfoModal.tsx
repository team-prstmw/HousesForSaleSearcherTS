/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import 'react-slideshow-image/dist/styles.css';

import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Slide } from 'react-slideshow-image';
import photosHouse from 'src/assets/images/House.png';
import photosMap from 'src/assets/images/Map.png';
import photosNavLogo from 'src/assets/images/NavLogo.png';
import photosNoPhoto from 'src/assets/images/nophoto.png';

import FacilitiesList from './FacilitiesList';
import styles from './MoreInfoModal.module.scss';
import PropertyInformationList from './PropertyInformationList';

const style = {
  p: 2,
  pb: 4,
};

const houseImages = [photosHouse, photosNavLogo, photosMap, photosNoPhoto];

type HouseInfo = {
  url: string;
  caption: string;
}[];

// Create array with house pohotos for modal
const slideImages: HouseInfo = [];

houseImages.forEach((houseImage, index) => {
  slideImages.push({
    url: houseImage,
    caption: `Photo ${index}`,
  });
});

const slideProperties = {
  autoplay: false,
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
        style={{ overflow: 'scroll' }}
      >
        <Paper sx={style} className={styles.modal}>
          <div className={styles.sideBySide}>
            <div className={styles.modalLeftSide}>
              <CloseIcon onClick={handleClose} className={styles.closeIcon} />
              <div className={styles.addressAndIcon}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  {moreInfo.address}
                </Typography>
                <FavoriteIcon className={styles.favoriteIcon} fontSize="large" />
              </div>

              <Slide {...slideProperties}>
                {slideImages.map((slideImage, index) => (
                  <div key={index}>
                    <div style={{ backgroundImage: `url(${slideImage.url})` }} className={styles.sliderPhoto}>
                      <span>{slideImage.caption}</span>
                    </div>
                  </div>
                ))}
              </Slide>

              <Typography variant="h4" className={styles.price}>
                {moreInfo.price}
              </Typography>
              <Button variant="contained" disableElevation size="large" color="primary">
                Buy House
              </Button>
              <div className={styles.spaceElements} />
              <div className={styles.spaceElements} />
            </div>

            <div className={styles.modalRightSide}>
              <Typography variant="h6" color="primary">
                Property information
              </Typography>
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

              <div className={styles.spaceElements} />
              <Typography variant="h6" color="primary">
                More facilities
              </Typography>
              <FacilitiesList />

              <div className={styles.spaceElements} />
              <Typography variant="h6" color="primary">
                More information
              </Typography>
              <Typography>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi laudantium beatae alias perspiciatis
                ducimus velit in officia nulla nobis. Repellendus incidunt, nobis sunt minima at ex magni possimus
                nesciunt totam! Labore, illo obcaecati iusto atque eveniet, earum incidunt nulla cum sed aperiam,
                necessitatibus perspiciatis numquam.
              </Typography>
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
