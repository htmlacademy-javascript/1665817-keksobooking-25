import { createMessage, succesMessage, errorMessage } from './alerts.js';
import { resetSlider } from './slider.js';
import { resetMap } from './map.js';
import { resetPics } from './photo-preview.js';

const form = document.querySelector('.ad-form');
const formInputs = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapInputs = mapFilters.querySelectorAll('select, fieldset');
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const btnSubmit = form.querySelector('.ad-form__submit');
const price = form.querySelector('#price');
const typeRooms = form.querySelector('#type');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const allInputs = [...formInputs, ...mapInputs];
const resetBtn = form.querySelector('.ad-form__reset');

form.classList.add('ad-form--disabled');
mapFilters.classList.add('ad-form--disabled');

const blockInputs = () => {
  allInputs.forEach((item) => {
    item.disabled = true;
  });
};
blockInputs();

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

const resetForm = () => {
  form.reset();
  mapFilters.reset();
  resetSlider();
  resetMap();
  resetPics();
};

const capacityOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pricesForRooms = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const validateRooms = () => capacityOptions[roomNumber.value].includes(roomCapacity.value);

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
  switch (roomCapacity.value) {
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

const validatePrice = () => pricesForRooms[typeRooms.value] <= price.value;

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});

checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});

typeRooms.addEventListener('change', () => {
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
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    btnSubmit.disabled = true;

    fetch('https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
        type: 'multipart/form-data',
      },
    )
      .then(() => {
        resetForm();
        createMessage(succesMessage);
      })
      .catch(() => {
        createMessage(errorMessage);
      })
      .finally(() => {
        btnSubmit.disabled = false;
      });
  }
});


resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

form.addEventListener('change', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
});

pristine.addValidator(roomNumber, validateRooms, getRoomsErrorMessage, 10, false);
pristine.addValidator(roomCapacity, validateRooms, getGuestsErrorMessage, 20, false);
pristine.addValidator(price, validatePrice, getPricesErrorMessage, 30, false);
pristine.addValidator(typeRooms, validatePrice, getPricesErrorMessage, 40, false);

export { unblockForms };
