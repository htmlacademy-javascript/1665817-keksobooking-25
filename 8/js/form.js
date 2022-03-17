const form = document.querySelector('.ad-form');
const formInputs = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapInputs = mapFilters.querySelectorAll('select, fieldset');
const map = document.querySelector('.map__canvas');
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const btnSubmit = form.querySelector('.ad-form__submit');
const price = form.querySelector('#price');
const typeRooms = form.querySelector('#type');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const allInputs = [...formInputs, ...mapInputs];

form.classList.add('ad-form--disabled');
mapFilters.classList.add('ad-form--disabled');

allInputs.forEach((item) => {
  item.disabled = true;
});

const unblockForms = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  allInputs.forEach((item) => {
    item.disabled = false;
  });
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

const capacityOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const pricesForRooms = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};


const validateRooms = () => capacityOptions[parseInt(roomNumber.value, 10)].includes(parseInt(roomCapacity.value, 10));

const getRoomsErrorMessage = () => {
  switch (parseInt(roomNumber.value, 10)) {
    case 1:
      return 'Только для одного гостя';
    case 2:
      return 'Только для одного либо 2х гостей';
    case 3:
      return 'Для 3х, 2х либо 1 гостя';
    case 100:
      return 'Это не для гостей';
  }
};

const getGuestsErrorMessage = () => {
  switch (parseInt(roomCapacity.value, 10)) {
    case 3:
      return 'Подойдёт только 3 комнаты';
    case 2:
      return 'Подойдёт 2 или 3 комнаты';
    case 1:
      return 'Подойдёт 1, 2 или 3 комнаты';
    case 0:
      return 'Для этого необходимо 100 комнат';
  }
};

const getPricesErrorMessage = () => {
  switch (typeRooms.value) {
    case 'bungalow':
      return 'Минимальная цена - 0р';
    case 'flat':
      return 'Минимальная цена - 1000р';
    case 'hotel':
      return 'Минимальная цена - 3000р';
    case 'house':
      return 'Минимальная цена - 5000р';
    case 'palace':
      return 'Минимальная цена - 10000р';
  }
};

const validatePrice = () => {

  pristine.reset();

  if (typeRooms.value === 'bungalow') {
    price.min = 0;
    price.setAttribute('data-pristine-min-message', 'Не менее 0р');
  } else if (typeRooms.value === 'flat') {
    price.min = 1000;
    price.setAttribute('data-pristine-min-message', 'Не менее 1000р');
  } else if (typeRooms.value === 'hotel') {
    price.min = 3000;
    price.setAttribute('data-pristine-min-message', 'Не менее 3000р');
  } else if (typeRooms.value === 'house') {
    price.min = 5000;
    price.setAttribute('data-pristine-min-message', 'Не менее 5000р');
  } else if (typeRooms.value === 'palace') {
    price.min = 10000;
    price.setAttribute('data-pristine-min-message', 'Не менее 10000р');
  }

  return pricesForRooms[typeRooms.value] <= price.value;
};

form.addEventListener('change', (e) => {
  e.preventDefault();

  checkOut.value = checkIn.value;

  if (typeRooms.value === 'bungalow') {
    price.placeholder = '0';
  } else if (typeRooms.value === 'flat') {
    price.placeholder = '1000';
  } else if (typeRooms.value === 'hotel') {
    price.placeholder = '3000';
  } else if (typeRooms.value === 'house') {
    price.placeholder = '5000';
  } else if (typeRooms.value === 'palace') {
    price.placeholder = '10000';
  }

  const isValid = pristine.validate();
  if (isValid) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
});

pristine.addValidator(roomNumber, validateRooms, getRoomsErrorMessage, 2, false);
pristine.addValidator(roomCapacity, validateRooms, getGuestsErrorMessage, 2, false);
pristine.addValidator(price, validatePrice, getPricesErrorMessage, 2, false);
pristine.addValidator(typeRooms, validatePrice, getPricesErrorMessage, 2, false);

export { unblockForms, map };
