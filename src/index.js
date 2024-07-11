import './pages/index.css';
import { openModal, closeModal, closeModalByClick } from './components/modal.js';
import { createCard, removeCard, toggleLike } from  './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo, editUserInfo, addNewCard, editUserAvatar, getMimeTypeFromUrl } from './components/api.js';
export { cardTemplate };

// DOM: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM: Контент, список карточек, профиль
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileName = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const profileAvatar = content.querySelector('.profile__image');

// DOM: Кнопки
const buttonProfileModal = document.querySelector('.profile__edit-button');
const buttonNewCardModal = document.querySelector('.profile__add-button');
const buttonEditAvatarModal = document.querySelector('.profile__avatar-edit-button');

// DOM: Модальные окна
const modalProfileEdit = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalEditAvatar = document.querySelector('.popup_type_edit-avatar');
const modalConfirmRemove = document.querySelector('.popup_type_confirm-remove');
const openModals = document.querySelectorAll('.popup');

// DOM: Модальное окно с изображением
const modalCard = document.querySelector('.popup_type_image');
const modalImg = modalCard.querySelector('.popup__image');
const modalImgCaption = modalCard.querySelector('.popup__caption');

// DOM: Форма профиля
const formProfileEdit = modalProfileEdit.querySelector('.popup__form');
const inputProfileName = formProfileEdit.querySelector('.popup__input_type_name');
const inputProfileDescription = formProfileEdit.querySelector('.popup__input_type_description');
const buttonProfileEdit = formProfileEdit.querySelector('.popup__button');

// DOM: Форма добавления карточки
const formAddCard = modalAddCard.querySelector('.popup__form');
const inputCardName = formAddCard.querySelector('.popup__input_type_card-name');
const inputCardUrl = formAddCard.querySelector('.popup__input_type_url');
const buttonAddCard = formAddCard.querySelector('.popup__button');

// DOM: Форма редактирования аватара
const formEditAvatar = modalEditAvatar.querySelector('.popup__form');
const inputEditAvatar = formEditAvatar.querySelector('.popup__input_type_avatar');
const buttonEditAvatar = formEditAvatar.querySelector('.popup__button');

// DOM: Форма подтверждения удаления карточки
const formConfirmRemove = modalConfirmRemove.querySelector('.popup__form');
const buttonConfirmRemove = formConfirmRemove.querySelector('.popup__button');

// Объект с настройками валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Допустимые mime-типы для аватара профиля
const validMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

// Функция редактирование профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonProfileEdit.textContent = 'Сохранение...';
  editUserInfo(inputProfileName.value, inputProfileDescription.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonProfileEdit.textContent = 'Сохранить';
      closeModal(modalProfileEdit);
    });
};

// Функция добавление карточки
function addCardFormSubmit(evt) {
  evt.preventDefault();
  buttonAddCard.textContent = 'Сохранение...';
  addNewCard(inputCardName.value, inputCardUrl.value)
    .then((itemCard) => {
      const idOwner = itemCard.owner._id;
      const newCard = createCard(itemCard, idOwner, openModalConfirmRemove, openModalImg, toggleLike);
      placesList.prepend(newCard);
      formAddCard.reset();
      buttonAddCard.classList.add(validationConfig.inactiveButtonClass);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonAddCard.textContent = 'Создать';
      closeModal(modalAddCard);
    });
}

// Функция изменения аватара с предварительной проверкой mime-типа
function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  buttonEditAvatar.textContent = 'Сохранение...';

  // Проверка mime-типа изображения
  getMimeTypeFromUrl(inputEditAvatar.value)
    .then((res) => {
      const hasMimeType = validMimeTypes.some(type => {
        return type === res.headers.get("content-type");
      });
      if(hasMimeType) {
        return res.url;
      };
      return Promise.reject(`Недопустимый mime-тип файла: ${res.headers.get("content-type")}. Разрешены: ${validMimeTypes.join(', ')}`);  
    })
    // Изменение аватара
    .then((url) => editUserAvatar(url))
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonEditAvatar.textContent = 'Сохранить';
      closeModal(modalEditAvatar);
    });
};

// Функция открытия окна подтверждения удаления карточки
function openModalConfirmRemove(cardItem) {
  formConfirmRemove.dataset.idCard = cardItem.id;
  openModal(modalConfirmRemove);
};

// Функция открытия карточки изображения
function openModalImg(dataCard) {
  modalImg.src = dataCard.link;
  modalImg.alt = `Фотография места из региона: ${dataCard.name}`;
  modalImgCaption.textContent = dataCard.name;
  openModal(modalCard);
};

// Обработчик открытия окна редактирования профиля
buttonProfileModal.addEventListener('click', evt => {
  clearValidation(formProfileEdit, validationConfig);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(modalProfileEdit);
});

// Обработчик открытия окна добавления карточки
buttonNewCardModal.addEventListener('click', evt =>  {
  clearValidation(formAddCard, validationConfig);
  openModal(modalAddCard);
});

// Обработчик открытия окна редактирования аватара
buttonEditAvatarModal.addEventListener('click', evt => {
  clearValidation(formEditAvatar, validationConfig);
  inputEditAvatar.value = profileAvatar.src;
  openModal(modalEditAvatar);
});

// Обработчик закрытия на все модальные окна по overlay и х
Array.from(openModals).forEach(modal => {
  closeModalByClick(modal);
});

// Обработчик формы редактирование профиля
formProfileEdit.addEventListener('submit', editProfileFormSubmit);

// Обработчик формы добавление карточки
formAddCard.addEventListener('submit', addCardFormSubmit);

// Обработчик формы изменения аватара
formEditAvatar.addEventListener('submit', editAvatarFormSubmit);

// Обработчик формы подтверждение удаления карточки
formConfirmRemove.addEventListener('submit', (evt) => {
  removeCard(evt.target.dataset.idCard);
  closeModal(modalConfirmRemove);
});

// Включение валидацию форм
enableValidation(validationConfig);

// Получение карточек и информации о пользователе с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // Вывод информации о пользователе
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    // Вывод карточек
    const idOwner = userInfo._id;
    initialCards.forEach(function(itemCard) {
      placesList.append(createCard(itemCard, idOwner, openModalConfirmRemove, openModalImg, toggleLike));
    });
  })
  .catch((err) => {
    console.error(err);
  });