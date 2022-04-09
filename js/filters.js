const houseType = document.querySelector('#housing-type');
const housePrice = document.querySelector('#housing-price');
const houseRooms = document.querySelector('#housing-rooms');
const houseGuests = document.querySelector('#housing-guests');
const houseFeatures = document.querySelector('#housing-features');
const mapFilters = document.querySelector('.map__filters');
const featuresInputs = document.querySelectorAll('.map__checkbox');

const filterValue = (input, cardField) => input.value === cardField || +input.value === cardField || input.value === 'any';

const priceName = (price) => {
  if (price >= 50000) {
    return 'high';
  }
  if (price >= 10000) {
    return 'middle';
  }
  else {
    return 'low';
  }
};

const filterFeatures = (offerFeatures) => {
  const checkedFeatures = houseFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length !== 0) {
    if (offerFeatures) {
      let featuresCount = 0;
      checkedFeatures.forEach((feature) => {
        if (offerFeatures.includes(feature.value)) {
          featuresCount += 1;
        }
      });
      return featuresCount === checkedFeatures.length;
    }
    return false;
  }
  return true;
};

const houseFilters = ({ offer }) =>
  filterValue(houseType, offer.type) &&
  filterValue(housePrice, priceName(offer.price)) &&
  filterValue(houseRooms, offer.rooms) &&
  filterValue(houseGuests, offer.guests) &&
  filterFeatures(offer.features);

const checkChanges = (cb) => {
  mapFilters.addEventListener('change', cb);
};

const getFeaturesRank = ({ offer }) => {

  let rank = 0;

  if (offer.features) {
    featuresInputs.forEach((feature) => {
      if (offer.features.includes(feature.value)) {
        rank += 1;
      }
    });
  }

  return rank;
};

const checkFeatures = (featureA, featureB) => {
  const rankA = getFeaturesRank(featureA);
  const rankB = getFeaturesRank(featureB);
  return rankB - rankA;
};

const resetFiltres = (cb) => {
  mapFilters.addEventListener('reset', () => setTimeout(cb, 100));
};

export { houseFilters, checkChanges, checkFeatures, resetFiltres };
