const getRandomNumber = (min, max) => {
  if (min >= max || min < 0) {
    console.log('Дружище, перепроверь числа, которые пытаешься запихать сюда.');
  }
  Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNumber();


const coordinate = (min, max, numder) => {
  if (min >= max || min < 0) {
    console.log('Дружище, перепроверь числа, которые пытаешься запихать сюда.');
  }
  const fraction = Math.random() * (max - min) + min;

  return fraction.toFixed(numder);
};

coordinate();

// https://codepen.io/jsundai/pen/vYKxNZp
// https://w3schoolsrus.github.io/js/js_number_methods.html#gsc.tab=0
// использовал эти ссылки для поиска решения.
