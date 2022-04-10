type BasicHouseData = {
  price: number;
  city: string;
  street: string;
  houseNr: string;
  descriptionField: string;
  images: string[];
};

type BasicHouseResponseType = {
  status: string;
  data: BasicHouseData[];
};