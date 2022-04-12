const houseType = document.querySelector('#housing-type');
const housePrice = document.querySelector('#housing-price');
const houseRooms = document.querySelector('#housing-rooms');
const houseGuests = document.querySelector('#housing-guests');
const houseFeatures = document.querySelector('#housing-features');
const mapFilters = document.querySelector('.map__filters');
const featuresInputs = document.querySelectorAll('.map__checkbox');

const Prices = {
  middle: { min: 10000, max: 50000 },
  low: { min: 0, max: 10000 },
  high: { min: 50000, max: 100000 },
};

const filterValue = (input, cardField) => input.value === cardField || +input.value === cardField || input.value === 'any';

const getPriceName = (price) => {
  if (price >= Prices.high.min) {
    return 'high';
  }
  if (price >= Prices.middle.min) {
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
      checkedFeatures.forEach((features) => {
        if (offerFeatures.includes(features.value)) {
          featuresCount += 1;
        }
      });
      return featuresCount === checkedFeatures.length;
    }
    return false;
  }
  return true;
};

const housingFiltration = ({ offer }) =>
  filterValue(houseType, offer.type) &&
  filterValue(housePrice, getPriceName(offer.price)) &&
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

const resetFilters = (cb) => {
  mapFilters.addEventListener('reset', (evt) => {
    evt.preventDefault();
    houseType.value = 'any';
    housePrice.value = 'any';
    houseRooms.value = 'any';
    houseGuests.value = 'any';
    featuresInputs.forEach((item) => {
      item.checked = false;
    });
    cb();
  });
};


export { housingFiltration, checkChanges, checkFeatures, resetFilters };
