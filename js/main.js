import { getData } from './data.js';
import { renderBaloons } from './map.js';
import './slider.js';
import { checkChanges, resetFiltres } from './filters.js';
import { debounce } from './util.js';
import './photo-preview.js';


getData((items) => {
  renderBaloons(items);
  checkChanges(debounce(
    () => renderBaloons(items),
    500,
  ));
  resetFiltres(() => renderBaloons(items));
});

