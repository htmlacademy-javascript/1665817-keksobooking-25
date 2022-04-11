import { getData } from './data.js';
import { renderBaloons } from './map.js';
import './slider.js';
import { checkChanges } from './filters.js';
import { debounce } from './util.js';
import './photo-preview.js';


getData((items) => {
  renderBaloons(items);
  checkChanges(debounce(
    () => renderBaloons(items),
    500,
  ));
});

