import { createAd } from './data.js';
import { render } from './renderData.js';

const ads = Array.from({ length: 1 }, createAd);
render(ads);

