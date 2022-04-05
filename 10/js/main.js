import { getData } from './data.js';
import { renderBaloons } from './map.js';
import './map.js';
import './slider.js';

const SIMILAR_AD_COUNT = 10;

getData((item) => {
  renderBaloons(item.slice(0, SIMILAR_AD_COUNT));
});

