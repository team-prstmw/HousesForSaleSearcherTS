/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import 'react-slideshow-image/dist/styles.css';

import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import { useApiGet } from 'src/hooks/useApi';

import FacilitiesList from './FacilitiesList';
import styles from './MoreInfoModal.module.scss';
import PropertyInformationList from './PropertyInformationList';

type HouseInfo = {
  url: string;
}[];

const slideProperties = {
  autoplay: false,
  transitionDuration: 500,
};

export default function MoreInfoModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [houseData, setHouseData] = useState<any[]>([]);
  const [housePhotos, setHousePhotos] = useState([{}]);

  const { data, isLoading } = useApiGet({ path: `/houses/${props.id}` });

  // Create array with house pohotos for modal
  const slideImages: HouseInfo = [];

  useEffect(() => {
    if (!isLoading) {
      const dataData = data.data;
      dataData.floor = Math.floor(Math.random() * 3) + 1;
      setHouseData(dataData);

      dataData.images.forEach((houseImage) => {
        slideImages.push({
          url: houseImage,
        });
      });
      setHousePhotos(slideImages);
    }
  }, [open]);

  return (
    <>
      <Button onClick={handleOpen}>More info</Button>
      <Modal open={open} onClose={handleClose} style={{ overflow: 'scroll' }}>
        <Paper sx={{ p: 2, pb: 4 }} className={styles.modal}>
          <div className={styles.sideBySide}>
            <div className={styles.modalLeftSide}>
              <CloseIcon onClick={handleClose} className={styles.closeIcon} />
              <div className={styles.addressAndIcon}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  {houseData?.street} {houseData?.houseNr}, {houseData?.city}
                </Typography>
                <FavoriteIcon className={styles.favoriteIcon} fontSize="large" />
              </div>

              <Slide {...slideProperties} className={styles.sliderMaxWidth}>
                {housePhotos.map((slideImage, index) => (
                  <div key={index}>
                    <div style={{ backgroundImage: `url(${slideImage.url})` }} className={styles.sliderPhoto} />
                  </div>
                ))}
              </Slide>

              <Typography variant="h4" className={styles.price}>
                {'???' && houseData?.price} zł
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
              <PropertyInformationList {...houseData} />

              <div className={styles.spaceElements} />
              <Typography variant="h6" color="primary">
                More facilities
              </Typography>
              <FacilitiesList />

              <div className={styles.spaceElements} />
              <Typography variant="h6" color="primary">
                More information
              </Typography>
              <Typography>{houseData?.descriptionField}</Typography>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  );
}
