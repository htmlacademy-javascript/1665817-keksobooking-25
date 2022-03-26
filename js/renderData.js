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
  });
};

export { render };
