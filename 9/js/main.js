import { getData } from './data.js';
import { renderBaloons } from './map.js';

// eslint-disable-next-line no-unused-vars
import { map } from './map.js';
// eslint-disable-next-line no-unused-vars
import { sliderElement } from './slider.js'; // просто прикрепил модуль к мейну

getData((item) => {
  renderBaloons(item.slice(0, 10));
});
//просто, как вариант разблокировки форм, чтобы выполнялось задание.
//map.addEventListener('click', () => {
//  unblockForms();
//});
