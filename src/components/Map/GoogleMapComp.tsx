import { House } from '@/utils/services/getCoordsFromAddress';
import { useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import styles from './GoogleMapComponent.module.scss';
import CSS from 'csstype';

type Coord = [number, number]
type SetHousesCoord = React.Dispatch<React.SetStateAction<Coord[]>>

async function fetchAndSetHousesCoords(setHousesCoords:SetHousesCoord) {
  const res = await fetch('https://pacific-refuge-80597.herokuapp.com/api/houses');
  const response = await res.json();
  const housesCoords = response.data.map((house:any) => [house.lat, house.lng]);
  setHousesCoords(housesCoords)
}

export default function GoogleMapComp(style:CSS.Properties) {
  function Map() {
    const [housesCoords, setHousesCoords] = useState<Coord[]>([]);
    fetchAndSetHousesCoords(setHousesCoords)
    return (
      <GoogleMap defaultZoom={6} defaultCenter={{ lat: 52.12, lng: 19.12 }}>
        {housesCoords.map((coord:Coord) => {
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
