import { getData } from './data.js';
import { renderBaloons } from './map.js';
import './slider.js';
import { checkChanges } from './filters.js';
import { debounce } from './util.js';
import './photoPreview.js';


getData((item) => {
  renderBaloons(item);
  checkChanges(debounce(
    () => renderBaloons(item),
    500,
  ));
});

