import { getRandomNumber, getRandomFloat } from './random.js';
import { render } from './renderData.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;


const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


const getRandomLengthArray = (features) => {
  const maxLength = features.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const newFeaturesArray = [];

  while (newFeaturesArray.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = features[indexOfEl];

    if (!newFeaturesArray.includes(el)) {
      newFeaturesArray.push(el);
    }
  }
  return newFeaturesArray;
};

const usersIds = Array.from({ length: 10 }, (v, i) => ++i);

const getUniqueId = () => {
  const imgId = usersIds.splice(getRandomNumber(0, usersIds.length - 1), 1);

  return imgId < 10 ? `img/avatars/user0${imgId}.png` : `img/avatars/user${imgId}.png`;
};


const createAd = () => {

  const locationLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
  const locationLng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

  return {
    author: {
      avatar: getUniqueId(),
    },
    offer: {
      title: 'Наше предложение:',
      address: `${locationLat} ${locationLng}`,
      price: getRandomNumber(0, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomLengthArray(FEATURES),
      description: 'Лучший выбор за эти деньги!',
      photos: getRandomLengthArray(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const getData = () => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((item) => {
      const dataAd = item;
      console.log(dataAd);
      render(item);
    });
  // .catch(() => {
  //   throw new Error('Данные не были получены!');
  // });
};
getData();
export { getData };
