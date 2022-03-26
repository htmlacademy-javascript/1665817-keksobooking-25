import { unblockForms } from './form.js';
import { getData } from './data.js';
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

const ads = Array.from({ length: 10 }, getData);

const secondIcons = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const ad = (item, addItem) => `
      <article class="popup">
        <img src="${item.author.avatar}" class="popup__avatar ${addItem.checkContent(item.author.avatar)}" width="70" height="70" alt="Аватар пользователя">
        <h3 class="popup__title ${addItem.checkContent(item.offer.title)}"> ${item.offer.title}</h3>
        <p class="popup__text popup__text--address ${addItem.checkContent(item.offer.address)}"> ${item.offer.address}</p>
        <p class="popup__text popup__text--price ${addItem.checkContent(item.offer.price)}"> ${item.offer.price} <span>₽/ночь</span></p>
        <h4 class="popup__type ${addItem.checkContent(item.offer.type)}">${addItem.typesOfRooms[item.offer.type]}</h4>
        <p class="popup__text popup__text--capacity ${addItem.checkContent(item.offer.rooms)} ${addItem.checkContent(item.offer.guests)}"> ${item.offer.rooms} ${addItem.getDeclension(item.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${item.offer.guests} ${addItem.getDeclension(item.offer.guests, ['гостя', 'гостей', 'гостей'])}</p>
        <p class="popup__text popup__text--time ${addItem.checkContent(item.offer.checkin)} ${addItem.checkContent(item.offer.checkout)}">Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}</p>
        <ul class="popup__features ${addItem.checkContent(item.offer.features)}">
          ${addItem.getFeaturesList}
        </ul>
        <p class="popup__description ${addItem.checkContent(item.offer.description)}">${item.offer.description}</p>
        <div class="popup__photos ${addItem.checkContent(item.offer.photos)}">
          ${addItem.getPhotosList}
        </div>
      </article>
`;

// ads.forEach((item) => {
//   const lat = item.location.lat;
//   const lng = item.location.lng;

//   const secondMarkers = L.marker({
//     lat,
//     lng,
//   },
//     {
//       icon: secondIcons,
//     },
//   );

//   secondMarkers.addTo(map)
//     .bindPopup(ad(ads, render));
// });

export { map };
