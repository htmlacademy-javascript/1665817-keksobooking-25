import { unblockForms } from './form.js';
import { render } from './renderData.js';

const address = document.querySelector('#address');
const CENTER_LAT = 35.68950;
const CENTER_LNG = 139.69171;

const map = L.map('map-canvas')
  .on('load', () => {
    unblockForms();
    address.value = `${CENTER_LAT}, ${CENTER_LNG}`;
    address.readOnly = true;
  })
  .setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (e) => {
  const LatLng = e.target.getLatLng();
  address.value = `${LatLng.lat.toFixed(5)}, ${LatLng.lng.toFixed(5)}`;
});


const secondIcons = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createSecondMarkers = ({ offer, author, location }) => {
  const secondMarkers = L.marker({
    lat: location.lat,
    lng: location.lng,
  },
    {
      icon: secondIcons,
    },
  );

  secondMarkers.addTo(map)
    .bindPopup(render({ offer, author }));
};

const renderBaloons = (similarCards) => {
  similarCards.forEach((item) => {
    createSecondMarkers(item);
  });
};

const resetMap = () => {
  address.value = `${CENTER_LAT}, ${CENTER_LNG}`;
  mainMarker.setLatLng({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  });

  map.setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  }, 10);
  map.closePopup();
};

export { map, renderBaloons, resetMap };
