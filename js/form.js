const form = document.querySelector('.ad-form');
const formInputs = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapInputs = mapFilters.querySelectorAll('select, fieldset');
const map = document.querySelector('.map__canvas');
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
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
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const capacityOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const validateRooms = () => capacityOptions[roomNumber.value].includes(roomCapacity.value);
const getRoomsErrorMessage = () => {
  // eslint-disable-next-line radix
  switch (parseInt(roomNumber.value)) {
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  pristine.validate();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

pristine.addValidator(roomNumber, validateRooms, getRoomsErrorMessage, 2, false);
pristine.addValidator(roomCapacity, validateRooms);

export { unblockForms, map };
