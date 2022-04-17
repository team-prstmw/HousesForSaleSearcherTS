type BasicHouseData = {
  _id: string;
  price: number;
  city: string;
  street: string;
  houseNr: string;
  descriptionField: string;
  images: string[];
};

type BasicHouseResponseType = {
  data: BasicHouseData[];
  status: string;
};
