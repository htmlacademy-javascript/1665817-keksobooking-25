const getDeclension = (num, expression) => {
  let result;
  let count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expression['2'];
  } else {
    count = count % 10;
    if (count === 1) {
      result = expression['0'];
    } else if (count >= 2 && count <= 4) {
      result = expression['1'];
    } else {
      result = expression['2'];
    }
  }
  return result;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getDeclension, debounce };
