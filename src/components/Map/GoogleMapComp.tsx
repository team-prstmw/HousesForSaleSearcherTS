import getCoordsFromAddress, { Coord, House } from '@/utils/services/getCoordsFromAddress';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import styles from './GoogleMapComponent.module.scss';
import CSS from 'csstype';


export default function GoogleMapComp({ houses, style }:{houses:House,style:CSS.Properties}) {
  function Map() {
    let [housesCoords, setHousesCoords]:[Coord[],Dispatch<SetStateAction<Coord[]>>] = useState<Coord[]>([]);
    useEffect(() => {
      let google:any
      const geocoder = new google.maps.Geocoder();
      if (!housesCoords.length) getCoordsFromAddress(houses, geocoder, setHousesCoords);
    }, [housesCoords.length]);
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
