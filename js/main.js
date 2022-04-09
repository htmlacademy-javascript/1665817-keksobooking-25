import { getData } from './data.js';
import { renderBaloons } from './map.js';
import './map.js';
import './slider.js';
import { checkChanges, resetFiltres } from './filters.js';
import { debounce } from './util.js';


getData((item) => {
  renderBaloons(item);
  checkChanges(debounce(
    () => renderBaloons(item),
    500,
  ));
  resetFiltres(() => renderBaloons(item));
});

