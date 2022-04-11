const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PIC = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__pic');
const photoChooser = document.querySelector('.ad-form__input');
const photoPreviewContainer = document.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');
photoPreview.style.width = '100%';
photoPreview.style.height = '100%';
photoPreviewContainer.appendChild(photoPreview);

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

const resetPics = () => {
  avatarPreview.src = DEFAULT_PIC;
  photoPreview.src = DEFAULT_PIC;
};

uploadFile(avatarChooser, avatarPreview);
uploadFile(photoChooser, photoPreview);

export { resetPics };
