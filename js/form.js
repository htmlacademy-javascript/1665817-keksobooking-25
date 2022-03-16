const form = document.querySelector('.ad-form');
const formInputs = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapInputs = mapFilters.querySelectorAll('select, fieldset');
const map = document.querySelector('.map__canvas');
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const btnSubmit = form.querySelector('.ad-form__submit');
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

const validateRooms = () => {

  pristine.reset();
  // eslint-disable-next-line radix
  return capacityOptions[parseInt(roomNumber.value)].includes(parseInt(roomCapacity.value));
};

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

const getGuestsErrorMessage = () => {
  // eslint-disable-next-line radix
  switch (parseInt(roomCapacity.value)) {
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

form.addEventListener('change', (e) => {
  e.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
});

pristine.addValidator(roomNumber, validateRooms, getRoomsErrorMessage, 2, false);
pristine.addValidator(roomCapacity, validateRooms, getGuestsErrorMessage, 2, false);

export { unblockForms, map };
