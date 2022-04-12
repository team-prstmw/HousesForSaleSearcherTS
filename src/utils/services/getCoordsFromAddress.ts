// temporary here
export interface House {
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
export type Coord = [number,number]

type ArrayGeoLocation = [{geometry:{location:{lat:()=>number,lng:()=>number}}}]

// markers doesnt show because Its doesnt work well and something is wrong with coord variable
// I WILL REMOVE THIS FUNCTION and  I use our API to get location data
export default async function getCoordsFromAddress(response:any, geocoder:any, setHouseCoords:any) {
  let coord : Coord =[0,0]
  const addressesList = await response;

  addressesList.forEach((house:House, i: number) => {
    const address = `${house.city} ${house.streetNumber} ${house.streetName}`;
    geocoder.geocode({ address }, (results:ArrayGeoLocation, status:string) => {
      if (status === 'OK' ) {
        coord[0] = results[0].geometry.location.lat(),
        coord[1] = results[0].geometry.location.lng()
      } else {
        console.error(`${address} ,Geocode error: ${status}`);
      }
      if (i === addressesList.length - 1) {
        setHouseCoords(coord);
      }
    });
  });
}
