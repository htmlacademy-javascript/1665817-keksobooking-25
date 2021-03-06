const MESSAGE_DELAY = 5000;

const createMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.innerHTML = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_DELAY);

  const closeBtn = alertContainer.querySelector('.error__button');

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onDocumentClose();
    }
  };

  function onDocumentClose() {
    alertContainer.classList.add('hidden');
    document.removeEventListener('click', onDocumentClose);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  const onButtonClose = () => {
    onDocumentClose();
    closeBtn.removeEventListener('click', onButtonClose);
  };

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClose);


  if (closeBtn) {
    closeBtn.addEventListener('click', onButtonClose);
  }
};

const successMessage = `
    <div class="success">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>
`;

const errorMessage = `
    <div class="error">
      <p class="error__message">Ошибка размещения объявления</p>
      <button type="button" class="error__button">Попробовать снова</button>
    </div>
`;

const errorDataMessage = `
    <div class="error">
      <p class="error__message">Ошибка загрузки данных, пожалуйста, попробуйте снова.</p>
    </div>
`;

export { createMessage, successMessage, errorMessage, errorDataMessage };
