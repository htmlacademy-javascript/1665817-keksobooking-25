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


const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};


const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


const getRandomLengthArray = (features) => {
  const maxLength = features.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
};

const usersId = Array.from({ length: 10 }, (v, i) => ++i);

const getUniqueID = () => {
  const imgID = usersId.splice(getRandomNumber(usersId), 1);

  return imgID < 10 ? `img/avatars/user0${imgID}.png` : `img/avatars/user${imgID}.png`;
};

const createObjects = () => ({
  author: {
    avatar: getUniqueID(),
  },
  offer: {
    title: 'Наше предложение:',
    address: '',
    price: getRandomNumber(1000, 10000),
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
    lat: getRandomFloat(LAT_MIN, LAT_MAX, 4),
    lng: getRandomFloat(LNG_MIN, LNG_MAX, 4),
  },
});

const getObjects = Array.from({ length: 10 }, createObjects);

console.log(getObjects);
