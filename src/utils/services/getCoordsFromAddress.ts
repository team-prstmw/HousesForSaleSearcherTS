interface House {
    streetNumber: string;
    streetName: string;
    streetSuffix: string;
    city: string;
    state: string;
    price: number;
    propertyType: string;
    yearBuilt: number;
    dimension: number;
    floor: number;
    floorsInBuilding: number;
    roomsNumber: number;
    bathroomNumber: number;
    heating: string;
    descriptionField: string;
  }
  type Coord = [number,number]
export default async function getCoordsFromAddress(response:any, geocoder:any, setHouseCoords:(arg:Coord )=>any) {
  let coord : Coord;
  const addressesList = await response;

  addressesList.forEach((house:House, i:number) => {
    const address = `${house.city} ${house.streetNumber} ${house.streetName}`;
    geocoder.geocode({ address }, (results:[{geometry:{location:{lat:()=>number,lng:()=>number}}}], status:string) => {
      if (status === 'OK') {
        let lat:number = results[0].geometry.location.lat() ;
        let lng:number = results[0].geometry.location.lng() ;
        coord.push(lat, lng);
      } else {
        console.error(`${address} ,Geocode error: ${status}`);
      }
      if (i === addressesList.length - 1) {
        setHouseCoords(coord);
      }
    });
  });
}
