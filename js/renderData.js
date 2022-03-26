import getDeclension from './declension.js';

const adForm = document.querySelector('#map-canvas');


const render = (data) => {

  data.forEach((item) => {

    const getFeaturesList = item.offer.features.reduce((acc, features) => {
      const list = `${acc}<li class="popup__feature popup__feature--${features}"></li>`;
      return list;
    }, '');

    const getPhotosList = item.offer.photos.reduce((acc, photos) => {
      const list = `${acc}<img src="${photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      return list;
    }, '');

    const typesOfRooms = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalow: 'Бунгало',
      hotel: 'Отель',
    };

    const checkContent = (key) => key ? '' : 'hidden';

    return `
    <article class="popup">
      <img src="${item.author.avatar}" class="popup__avatar ${checkContent(item.author.avatar)}" width="70" height="70" alt="Аватар пользователя">
        <h3 class="popup__title ${checkContent(item.offer.title)}"> ${item.offer.title}</h3>
        <p class="popup__text popup__text--address ${checkContent(item.offer.address)}"> ${item.offer.address}</p>
        <p class="popup__text popup__text--price ${checkContent(item.offer.price)}"> ${item.offer.price} <span>₽/ночь</span></p>
        <h4 class="popup__type ${checkContent(item.offer.type)}">${typesOfRooms[item.offer.type]}</h4>
        <p class="popup__text popup__text--capacity ${checkContent(item.offer.rooms)} ${checkContent(item.offer.guests)}"> ${item.offer.rooms} ${getDeclension(item.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${item.offer.guests} ${getDeclension(item.offer.guests, ['гостя', 'гостей', 'гостей'])}</p>
        <p class="popup__text popup__text--time ${checkContent(item.offer.checkin)} ${checkContent(item.offer.checkout)}">Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}</p>
        <ul class="popup__features ${checkContent(item.offer.features)}">
          ${getFeaturesList}
        </ul>
        <p class="popup__description ${checkContent(item.offer.description)}">${item.offer.description}</p>
        <div class="popup__photos ${checkContent(item.offer.photos)}">
          ${getPhotosList}
        </div>
    </article>`;
  });
};

export { render };
