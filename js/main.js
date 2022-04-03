import { getData } from './data.js';
import { renderBaloons } from './map.js';

import './map.js';

import './slider.js';

getData((item) => {
  renderBaloons(item.slice(0, 10));
});

