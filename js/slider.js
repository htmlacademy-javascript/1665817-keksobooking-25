const sliderElement = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');

price.value = 1000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 50,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => {
  sliderElement.noUiSlider.set(price.value);
});

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export { sliderElement, resetSlider };
