const form = document.querySelector('.ad-form');
const formInputs = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapInputs = mapFilters.querySelectorAll('select, fieldset');
const map = document.querySelector('.map__canvas');

form.classList.add('ad-form--disabled');
mapFilters.classList.add('ad-form--disabled');

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].disabled = true;
}

for (let i = 0; i < mapInputs.length; i++) {
  mapInputs[i].disabled = true;
}

const unblockForms = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = false;
  }

  for (let i = 0; i < mapInputs.length; i++) {
    mapInputs[i].disabled = false;
  }
};

export { unblockForms, map };
