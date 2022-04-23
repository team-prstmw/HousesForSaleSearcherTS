import { House } from '@/utils/services/getCoordsFromAddress';
import { useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps';
import styles from './GoogleMapComponent.module.scss';
import CSS from 'csstype';

type Houses = {
  _id: number;
  city: string;
  street: string;
  descriptionField: string;
  lat: number;
  lng: number;
};

type SetHousesCoord = React.Dispatch<React.SetStateAction<Houses[]>>;

async function fetchAndSetHousesCoords(setHousesCoords: SetHousesCoord) {
  const res = await fetch('https://pacific-refuge-80597.herokuapp.com/api/houses');
  const response = await res.json();
  const housesCoords = response.data.map((house: Houses) => ({
    _id: house._id,
    city: house.city,
    street: house.street,
    descriptionField: house.descriptionField,
    lat: house.lat,
    lng: house.lng,
  }));
  setHousesCoords(housesCoords);
}

type HouseDataAndStyleCSS = { houses: House; style: CSS.Properties };
export default function GoogleMapComp({ style }: HouseDataAndStyleCSS) {
  function Map() {
    const [housesCoords, setHousesCoords] = useState<Houses[]>([]);
    const [selectedHouse, setSelectedHouse] = useState<Houses | null>(null);
    fetchAndSetHousesCoords(setHousesCoords);
    return (
      <GoogleMap defaultZoom={6} defaultCenter={{ lat: 52.12, lng: 19.12 }}>
        {housesCoords.map((houses: Houses) => (
          <Marker
            position={{
              lat: houses.lat,
              lng: houses.lng,
            }}
            onClick={() => {
              setSelectedHouse(houses);
            }}
          >
            {selectedHouse && selectedHouse._id === houses._id ? (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedHouse(null);
                }}
              >
                <div>
                  <h4>{selectedHouse.street}</h4>
                  <p>{selectedHouse.descriptionField}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
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
