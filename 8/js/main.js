import { createAd } from './data.js';
import { render } from './renderData.js';
import { unblockForms, map } from './form.js';

const ads = Array.from({ length: 1 }, createAd);
render(ads);

//просто, как вариант разблокировки форм, чтобы выполнялось задание.
map.addEventListener('click', () => {
  unblockForms();
});
