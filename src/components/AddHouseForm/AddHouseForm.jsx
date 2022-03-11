import { yupResolver } from '@hookform/resolvers/yup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { create, storage } from '/src/firebase';
import getRandomString from '/src/utils/getRandomString';

import styles from './AddHouseForm.module.css';
import FacilityCheckbox from './components/FacilityCheckbox/FacilityCheckbox';

const REQUIRED_ERROR = 'This field is required.';
const SPECIAL_CHARACTERS_ERROR = 'No special characters allowed.';
const NUMBER_NEEDED_ERROR = 'This field must be a number.';
const POSITIVE_NUMBER_ERROR = 'Must be a positive number.';
const NEGATIVE_NUMBER_ERROR = 'Cannot be a negative number.';

const schema = yup.object({
  streetNumber: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  streetName: yup.string().required(REQUIRED_ERROR),
  streetSuffix: yup.string().required(REQUIRED_ERROR),
  city: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  state: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  price: yup.number(NUMBER_NEEDED_ERROR).positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  propertyType: yup.string().required(REQUIRED_ERROR),
  yearBuilt: yup.number(NUMBER_NEEDED_ERROR).positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  dimension: yup.number(NUMBER_NEEDED_ERROR).positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  floor: yup.number(NUMBER_NEEDED_ERROR).min(0, NEGATIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  floorsInBuilding: yup.number(NUMBER_NEEDED_ERROR).min(0, NEGATIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  roomsNumber: yup.number(NUMBER_NEEDED_ERROR).positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  bathroomNumber: yup.number(NUMBER_NEEDED_ERROR).positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  heating: yup.string().required(REQUIRED_ERROR),
  descriptionField: yup.string().required(REQUIRED_ERROR),
});

const AddHouseForm = () => {
  const [moreFacilitiesShown, setMoreFacilitiesShown] = useState(false);
  const [images, setImages] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const addIndexToObjectKey = (propertyName) => {
    return `photo_${propertyName}`;
  };

  const sendHouseDataWithPhotos = (imagesToUpload, housesData) => {
    let photos = {};
    imagesToUpload.forEach((element, index) => {
      const file = element;
      const metadata = { contentType: 'image/jpeg' };
      const storageRef = ref(storage, `images/${getRandomString(9)}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on('state_changed', null, null, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          photos = { [addIndexToObjectKey(index)]: downloadURL };
          const uploadedData = Object.assign(housesData, photos);
          if (index === imagesToUpload.length - 1) {
            create('houses', uploadedData);
          }
        });
      });
    });
  };

  const addImages = (rawImages) => {
    setImages(Array.from(rawImages));
  };

  const removeImage = (name) => setImages((prevState) => prevState?.filter((img) => img.name !== name));

  const handleSend = (fields) => {
    sendHouseDataWithPhotos(images, fields);
  };

  const facilities = [
    'Garage',
    'Parking spot',
    'Garden',
    'Elevator',
    'Basement',
    'Loggy',
    'Balcony',
    'Terrace',
    'Entresol',
    'Playground',
    'Internet',
    'Swimming pool',
    'Gym',
    'Kitchenette',
  ];
  return (
    <Box component="form" className={styles.formContainer} onSubmit={handleSubmit(handleSend)}>
      <div className={styles.formSection}>
        <Typography variant="h6" color="primary">
          Address Information
        </Typography>
        <TextField
          id="street-number"
          {...register('streetNumber')}
          label="Street number"
          error={!!errors?.streetNumber}
          helperText={errors?.streetNumber && errors?.streetNumber.message}
          autoComplete="address-line1"
        />
        <span className={styles.formRow}>
          <TextField
            id="street-name"
            {...register('streetName')}
            label="Street name"
            error={!!errors?.streetName}
            helperText={errors?.streetName && errors?.streetName.message}
            sx={{ width: '100%' }}
            autoComplete="address-line2"
          />
          <FormControl sx={{ minWidth: '45%' }} error={errors?.streetSuffix}>
            <InputLabel id="street-suffix">Street Suffix</InputLabel>
            <Select
              labelId="street-suffix"
              id="street-suffix"
              label="Street Suffix"
              defaultValue=""
              {...register('streetSuffix')}
            >
              <MenuItem value="street">St</MenuItem>
              <MenuItem value="avenue">Ave</MenuItem>
              <MenuItem value="boulevard">Blvd</MenuItem>
              <MenuItem value="lane">Ln</MenuItem>
              <MenuItem value="place">Pl</MenuItem>
              <MenuItem value="road">Rd</MenuItem>
            </Select>
            {errors?.streetSuffix && <FormHelperText>{errors?.streetSuffix.message}</FormHelperText>}
          </FormControl>
        </span>
        <span className={styles.formRow}>
          <TextField
            id="city"
            {...register('city')}
            label="City"
            error={!!errors?.city}
            helperText={errors?.city && errors?.city.message}
            autoComplete="address-level12"
          />
          <TextField
            id="state"
            {...register('state')}
            label="State"
            error={!!errors?.state}
            helperText={errors?.state && errors?.state.message}
            autoComplete="state"
          />
        </span>
      </div>
      <div className={styles.formSection}>
        <Typography variant="h6" color="primary">
          Property Information
        </Typography>
        <span className={styles.formRow}>
          <TextField
            id="price"
            type="number"
            defaultValue={1}
            {...register('price')}
            label="Price"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            error={!!errors?.price}
            helperText={errors?.price && errors?.price.message}
          />
          <FormControl fullWidth error={!!errors?.propertyType}>
            <InputLabel id="property-type">Type of property</InputLabel>
            <Select
              labelId="property-type"
              id="property-type-select"
              label="Type of property"
              defaultValue=""
              {...register('propertyType')}
            >
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="multi-family">Multi-family</MenuItem>
              <MenuItem value="townhome">Townhome</MenuItem>
              <MenuItem value="lot">Lot</MenuItem>
              <MenuItem value="condo">Condo</MenuItem>
            </Select>
            {errors?.propertyType && <FormHelperText>{errors?.propertyType.message}</FormHelperText>}
          </FormControl>
        </span>
        <span className={styles.formRow}>
          <TextField
            id="year-built"
            type="number"
            defaultValue={2000}
            {...register('yearBuilt')}
            label="Year built"
            error={!!errors?.yearBuilt}
            helperText={errors?.yearBuilt && errors?.yearBuilt.message}
          />
          <TextField
            id="dimension"
            type="number"
            defaultValue={0}
            {...register('dimension')}
            label="Dimension (sqft)"
            error={!!errors?.dimension}
            helperText={errors?.dimension && errors?.dimension.message}
          />
        </span>
        <span className={styles.formRow}>
          <TextField
            id="floor"
            type="number"
            defaultValue={0}
            {...register('floor')}
            label="Floor"
            error={!!errors?.floor}
            helperText={errors?.floor && errors?.floor.message}
          />
          <TextField
            id="floors-in-building"
            type="number"
            defaultValue={0}
            {...register('floorsInBuilding')}
            label="Floors in building"
            error={!!errors?.floorsInBuilding}
            helperText={errors?.floorsInBuilding && errors?.floorsInBuilding.message}
          />
        </span>
        <span className={styles.formRow}>
          <TextField
            id="rooms-number"
            type="number"
            defaultValue={0}
            {...register('roomsNumber')}
            label="Number of rooms"
            error={!!errors?.roomsNumber}
            helperText={errors?.roomsNumber && errors?.roomsNumber.message}
          />
          <TextField
            id="bathroom-number"
            type="number"
            defaultValue={0}
            {...register('bathroomNumber')}
            label="Number of bathrooms"
            error={!!errors?.bathroomNumber}
            helperText={errors?.bathroomNumber && errors?.bathroomNumber.message}
          />
        </span>
        <FormControl fullWidth error={!!errors?.heating}>
          <InputLabel id="heating">Heating</InputLabel>
          <Select labelId="heating" id="heating" label="Heating" defaultValue="" {...register('heating')}>
            <MenuItem value="forced-air">Forced Air</MenuItem>
            <MenuItem value="radiators">Radiators</MenuItem>
            <MenuItem value="heat-pump">Heat Pump</MenuItem>
            <MenuItem value="hybrid-heating">Hybrid</MenuItem>
            <MenuItem value="radiant-heating">Radiant</MenuItem>
            <MenuItem value="baseboard-heaters">Baseboard Heaters</MenuItem>
          </Select>
          {errors?.heating && <FormHelperText>{errors?.heating.message}</FormHelperText>}
        </FormControl>
      </div>
      <Button
        variant="outlined"
        onClick={() => setMoreFacilitiesShown((prevState) => !prevState)}
        endIcon={moreFacilitiesShown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{ margin: '10px 0' }}
      >
        MORE FACILITIES
      </Button>

      {moreFacilitiesShown && (
        <FormGroup>
          <span className={styles.moreParamsCheckbox}>
            {facilities.map((facility) => (
              <FacilityCheckbox key={facility} label={facility} />
            ))}
          </span>
        </FormGroup>
      )}
      <TextField
        id="description-field"
        label="More information"
        multiline
        rows={8}
        {...register('descriptionField')}
        error={!!errors?.descriptionField}
        helperText={errors?.descriptionField && errors?.descriptionField.message}
      />
      <label htmlFor="images-upload">
        <input
          style={{ display: 'none' }}
          id="images-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => addImages(e.target.files)}
        />
        <Button variant="contained" color="primary" component="span" sx={{ margin: '10px 0' }}>
          Upload images
        </Button>
      </label>
      {images?.map(
        (image) =>
          image && (
            <div key={image.name} className={styles.formImagesContainer}>
              <img src={URL.createObjectURL(image)} alt={image.name} className={styles.formImage} />
              <button type="button" className={styles.formImageRemoveButton} onClick={() => removeImage(image.name)}>
                <DeleteForeverIcon color="secondary" />
              </button>
            </div>
          )
      )}
      <Button type="submit" variant="contained" sx={{ margin: '10px 0' }}>
        SEND
      </Button>
    </Box>
  );
};

export default AddHouseForm;
