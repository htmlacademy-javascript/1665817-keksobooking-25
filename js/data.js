const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((items) => {
      onSuccess(items);
    });
  // .catch(() => {
  //   throw new Error('Данные не были получены!');
  // });
};

export { getData };
