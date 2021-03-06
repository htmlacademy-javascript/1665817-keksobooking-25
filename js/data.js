import { createMessage, errorDataMessage } from './alerts.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((items) => {
      onSuccess(items);
    })
    .catch(() => {
      createMessage(errorDataMessage);
    });
};

export { getData };
