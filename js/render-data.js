import { getDeclension } from './util.js';

const render = (items) => {
  let features = '';
  let photos = '';
  if (items.offer) {

    if (items.offer.features) {
      features = items.offer.features.reduce((acc, feat) => {
        const list = `${acc}<li class="popup__feature popup__feature--${feat}"></li>`;
        return list;
      }, '');
    }

    if (items.offer.photos) {
      photos = items.offer.photos.reduce((acc, photo) => {
        const list = `${acc}<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
        return list;
      }, '');
    }

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
            <img src="${items.author.avatar}" class="popup__avatar ${checkContent(items.author.avatar)}" width="70" height="70" alt="Аватар пользователя">
              <h3 class="popup__title ${checkContent(items.offer.title)}"> ${items.offer.title}</h3>
              <p class="popup__text popup__text--address ${checkContent(items.offer.address)}"> ${items.offer.address}</p>
              <p class="popup__text popup__text--price ${checkContent(items.offer.price)}"> ${items.offer.price} <span>₽/ночь</span></p>
              <h4 class="popup__type ${checkContent(items.offer.type)}">${typesOfRooms[items.offer.type]}</h4>
              <p class="popup__text popup__text--capacity ${checkContent(items.offer.rooms)} ${checkContent(items.offer.guests)}"> ${items.offer.rooms} ${getDeclension(items.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${items.offer.guests} ${getDeclension(items.offer.guests, ['гостя', 'гостей', 'гостей'])}</p>
              <p class="popup__text popup__text--time ${checkContent(items.offer.checkin)} ${checkContent(items.offer.checkout)}">Заезд после ${items.offer.checkin}, выезд до ${items.offer.checkout}</p>
              <ul class="popup__features ${checkContent(items.offer.features)}">
                ${features}
              </ul>
              <p class="popup__description ${checkContent(items.offer.description)}">${items.offer.description}</p>
              <div class="popup__photos ${checkContent(items.offer.photos)}">
                ${photos}
              </div>
          </article>`;
  }
};

export { render };
