export default async function getCoordsFromAddress(response, geocoder, setHouseCoords) {
  const coordsList = [];
  const addressesList = await response;

  addressesList.forEach((house, i) => {
    const address = `${house.city} ${house.streetNumber} ${house.streetName}`;
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        coordsList.push([lat, lng]);
      } else {
        console.error(`${address} ,Geocode error: ${status}`);
      }
      if (i === addressesList.length - 1) {
        setHouseCoords(coordsList);
      }
    });
  });
}
