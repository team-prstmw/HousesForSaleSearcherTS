import { create } from '/src/firebase';

export const addHouseToDB = (props) => {
  const {
    bathroomNumber,
    city,
    descriptionField,
    dimension,
    floor,
    floorsInBuilding,
    heating,
    price,
    propertyType,
    roomsNumber,
    state,
    streetName,
    streetNumber,
    streetSuffix,
    yearBuilt,
    images,
    moreFacilities,
  } = props.fields;

  const newHouseData = {
    streetNumber,
    streetName,
    streetSuffix,
    city,
    state,
    price,
    propertyType,
    yearBuilt,
    dimension,
    floor,
    floorsInBuilding,
    roomsNumber,
    bathroomNumber,
    heating,
    moreFacilities,
    descriptionField,
    images,
    createdAt: new Date().toISOString(),
  };

  return create('houses', newHouseData);
};

export default addHouseToDB;
