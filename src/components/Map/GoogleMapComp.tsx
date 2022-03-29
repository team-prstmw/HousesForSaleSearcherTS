import getCoordsFromAddress from '@/utils/services/getCoordsFromAddress';
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import styles from './GoogleMapComponent.module.scss';

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
type Coord = [number,number]|[]
export default function GoogleMapComp({ houses, style }:{houses:House,style:any}) {
  function Map() {
    const [housesCoords, setHousesCoords] = useState<Coord>([]);
    useEffect(() => {
      let google:any
      const geocoder = new google.maps.Geocoder();
      if (!housesCoords.length) getCoordsFromAddress(houses, geocoder, setHousesCoords);
    }, [housesCoords.length]);

    return (
      <GoogleMap defaultZoom={6} defaultCenter={{ lat: 52.12, lng: 19.12 }}>
        {housesCoords.map((coord:any) => {
          return (
            <Marker
              position={{
                lat: coord[0],
                lng: coord[1],
              }}
            />
          );
        })}
      </GoogleMap>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <div className={styles.googleMapContainer} style={style}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
