const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__pic');
const photoChooser = document.querySelector('.ad-form__input');
const photoPreviewContainer = document.querySelector('.ad-form__photo');
const photoPreview = photoPreviewContainer.innerHTML = '<img src="" class="ad-form__house_pic" alt="Фото жилья" width="40" height="44">';
console.log(photoPreview)
const uploadFile = (chooser, preview) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

uploadFile(avatarChooser, avatarPreview);
uploadFile(photoChooser, photoPreview);
