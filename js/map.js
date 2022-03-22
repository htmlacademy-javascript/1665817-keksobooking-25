import { unblockForms } from './form.js';
import { createAd } from './data.js';
import { render } from './renderData.js';

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    unblockForms();
    address.value = '35.68950, 139.69171';
    address.readOnly = true;
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
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

const marker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (e) => {
  const LatLng = e.target.getLatLng();
  // eslint-disable-next-line no-useless-concat
  address.value = `${LatLng.lat.toFixed(5)}` + ',' + `${LatLng.lng.toFixed(5)}`;
});

const ads = Array.from({ length: 10 }, createAd);

const secondIcons = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

ads.forEach((item) => {
  const lat = item.location.lat;
  const lng = item.location.lng;

  const secondMarkers = L.marker({
    lat,
    lng,
  },
    {
      icon: secondIcons,
    },
  );

  secondMarkers.addTo(map)
    .bindPopup(render(ads));
});

export { map };
