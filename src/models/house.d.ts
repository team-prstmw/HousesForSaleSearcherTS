type BasicHouseData = {
  _id: string;
  price: number;
  city: string;
  street: string;
  houseNr: string;
  descriptionField: string;
  images: string[];
  lat: number;
  lng: number;
};

type BasicHouseResponseType = {
  data: BasicHouseData[];
  status: string;
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
