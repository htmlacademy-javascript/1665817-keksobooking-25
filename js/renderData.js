import declension from './declOfNum.js';

const adForm = document.querySelector('#map-canvas');


const render = (data) => {

  adForm.innerHTML = '';

  data.forEach((item) => {

    const getFeatures = item.offer.features.reduce((acc, features) => {
      const result = `${acc}<li class="popup__feature popup__feature--${features}"></li>`;
      return result;
    }, '');

    const getPhotos = item.offer.photos.reduce((acc, photos) => {
      const result = `${acc}<img src="${photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      return result;
    }, '');

    const typesOfRooms = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalow: 'Бунгало',
      hotel: 'Отель',
    };

    const checkContent = (key) => key === 'undefined' ? 'hidden' : '';

    adForm.insertAdjacentHTML('beforeend', `
      <article class="popup">
        <img src="${item.author.avatar}" class="popup__avatar ${checkContent(item.author.avatar)}" width="70" height="70" alt="Аватар пользователя">
        <h3 class="popup__title"> ${item.offer.title}</h3>
        <p class="popup__text popup__text--address"> ${item.offer.address}</p>
        <p class="popup__text popup__text--price"> ${item.offer.price} <span>₽/ночь</span></p>
        <h4 class="popup__type">${typesOfRooms[item.offer.type]}</h4>
        <p class="popup__text popup__text--capacity">${item.offer.rooms} ${declension(item.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${item.offer.guests} ${declension(item.offer.guests, ['гостя', 'гостей', 'гостей'])}</p>
        <p class="popup__text popup__text--time">Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}</p>
        <ul class="popup__features">
          ${getFeatures}
        </ul>
        <p class="popup__description">${item.offer.description}</p>
        <div class="popup__photos">
          ${getPhotos}
        </div>
      </article>
`);
  });
};

export { render };
