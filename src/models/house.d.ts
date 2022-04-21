type BasicHouseData = {
  price: number;
  city: string;
  streetName: string;
  streetNumber: string;
  photo_0: string;
  descriptionField: string;
};

interface HousesData {
  _id: string,
price: number,
street: string,
houseNr: string,
city: string,
descriptionField: string,
images: string[]
lat: number,
lng: number
}
