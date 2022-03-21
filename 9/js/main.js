import { createAd } from './data.js';
import { render } from './renderData.js';
import { unblockForms, map } from './form.js';
// eslint-disable-next-line no-unused-vars
import { sliderElement } from './slider.js'; // просто прикрепил модуль к мейну

const ads = Array.from({ length: 1 }, createAd);
render(ads);

//просто, как вариант разблокировки форм, чтобы выполнялось задание.
map.addEventListener('click', () => {
  unblockForms();
});
