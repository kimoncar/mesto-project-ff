import './pages/index.css';
import { openModal, closeModal, closeModalByClick } from './components/modal.js';
import { createCard, removeCard, toggleLike } from  './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getUserInfo } from './components/api.js';
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
const buttonNewCard = document.querySelector('.profile__add-button');

// DOM: Модальные окна
const modalProfileEdit = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');
const openModals = document.querySelectorAll('.popup');

// DOM: Модальное окно с изображением
const modalCard = document.querySelector('.popup_type_image');
const modalImg = modalCard.querySelector('.popup__image');
const modalImgCaption = modalCard.querySelector('.popup__caption');

// DOM: Форма профиля
const formProfileEdit = modalProfileEdit.querySelector('.popup__form');
const inputProfileName = formProfileEdit.querySelector('.popup__input_type_name');
const inputProfileDescription = formProfileEdit.querySelector('.popup__input_type_description');

// DOM: Форма добавления карточки
const formAddCard = modalAddCard.querySelector('.popup__form');
const inputCardName = formAddCard.querySelector('.popup__input_type_card-name');
const inputCardUrl = formAddCard.querySelector('.popup__input_type_url');
const buttonAddCard = formAddCard.querySelector('.popup__button');

// Объект с настройками валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(modalProfileEdit);
};

// Функция добавления карточки
function addCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({name: inputCardName.value, link: inputCardUrl.value}, removeCard, openModalImg, toggleLike);
  placesList.prepend(newCard);
  formAddCard.reset();
  buttonAddCard.classList.add(validationConfig.inactiveButtonClass);
  closeModal(modalAddCard);
}

// Функция открытия карточки изображения
function openModalImg(dataCard) {    
  modalImg.src = dataCard.link;
  modalImg.alt = `Фотография места из региона: ${dataCard.name}`;
  modalImgCaption.textContent = dataCard.name;
  openModal(modalCard);
};

// Открыть окно редактирования профиля
buttonProfileModal.addEventListener('click', evt => {
  clearValidation(formProfileEdit, validationConfig);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(modalProfileEdit);
});

// Открыть окно добавления карточки
buttonNewCard.addEventListener('click', evt =>  {
  clearValidation(formAddCard, validationConfig);
  openModal(modalAddCard);
});

// Обработчик закрытия на все модальные окна по overlay и х
openModals.forEach(modal => {
  closeModalByClick(modal);
});

// Редактирование профиля
formProfileEdit.addEventListener('submit', profileFormSubmit);

// Добавление карточки
formAddCard.addEventListener('submit', addCardFormSubmit);

// Включить валидацию форм
enableValidation(validationConfig);

// Получение данных с сервера
Promise.all([getInitialCards(), getUserInfo()])
  // Получение и вывод карточек
  .then(([initialCards, userInfo]) => {
    initialCards.forEach(function(itemCard) {
      placesList.append(createCard(itemCard, removeCard, openModalImg, toggleLike));
    });

    // Получение и вывод информации о пользователе
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.log(err);
  })