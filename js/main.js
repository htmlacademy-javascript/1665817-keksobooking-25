import { createAd } from './data.js';
import { render } from './renderData.js';

const ads = Array.from({ length: 10 }, createAd);
render(ads);
