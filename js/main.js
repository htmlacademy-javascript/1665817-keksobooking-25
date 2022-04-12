import { getData } from './data.js';
import { renderBaloons } from './map.js';
import { checkChanges, resetFilters } from './filters.js';
import { debounce } from './util.js';
import './photo-preview.js';
import './slider.js';

const RENDER_DELAY = 500;
getData((items) => {
  renderBaloons(items);
  checkChanges(debounce(
    () => renderBaloons(items),
    RENDER_DELAY,
  ));
  resetFilters(() => renderBaloons(items));
});

