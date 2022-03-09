import { createAd } from './data.js';
import declOfNum from './declOfNum.js';

const adForm = document.querySelector('#map-canvas');
const ads = Array.from({ length: 10 }, createAd);

const render = (data) => {

  adForm.innerHTML = '';

  data.forEach((item) => {
    adForm.insertAdjacentHTML('beforeend', `
  <article class="popup">
    <img src="${item.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
    <h3 class="popup__title">${item.title}</h3>
    <p class="popup__text popup__text--address">${item.address}</p>
    <p class="popup__text popup__text--price">${item.price} <span>₽/ночь</span></p>
    <h4 class="popup__type">Квартира</h4>
    <p class="popup__text popup__text--capacity">${declOfNum(item.rooms.length, ['комната', 'комнаты', 'комнат'])} для ${declOfNum(item.guests.length, ['гостя', 'гостей', 'гостей'])}</p>
    <p class="popup__text popup__text--time">Заезд после ${item.checkin}, выезд до ${item.checkout}</p>
    <ul class="popup__features">
      <li class="popup__feature popup__feature--wifi"></li>
      <li class="popup__feature popup__feature--dishwasher"></li>
      <li class="popup__feature popup__feature--parking"></li>
      <li class="popup__feature popup__feature--washer"></li>
      <li class="popup__feature popup__feature--elevator"></li>
      <li class="popup__feature popup__feature--conditioner"></li>
    </ul>
    <p class="popup__description">${item.description}</p>
    <div class="popup__photos">
      <img src="${item.photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    </div>
  </article>
`);
  });
};

render(ads);

export default adForm;
