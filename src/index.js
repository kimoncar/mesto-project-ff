import './pages/index.css';
import { openModal, closeModal, closeModalByClick } from './components/modal.js';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, toggleLike } from  './components/card.js';
export { cardTemplate};

// DOM: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM: Контент, список карточек, профиль
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileName = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');

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

// DOM: Форма добаления карточки
const formAddCard = modalAddCard.querySelector('.popup__form');
const inputCardName = formAddCard.querySelector('.popup__input_type_card-name');
const inputCardUrl = formAddCard.querySelector('.popup__input_type_url');

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
  closeModal(modalAddCard);
}

// Функция открытия карточки изображения
function openModalImg(dataCard) {    
  modalImg.src = dataCard.link;
  modalImg.alt = `Фотография места из региона: ${dataCard.name}`;
  modalImgCaption.textContent = dataCard.name;
  openModal(modalCard);
};

// Вывод карточек на страницу
initialCards.forEach(function(itemCard) {
  placesList.append(createCard(itemCard, removeCard, openModalImg, toggleLike));
});

// Открыть окно редактирования профиля
buttonProfileModal.addEventListener('click', evt => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(modalProfileEdit);
});

// Открыть окно добавления карточки
buttonNewCard.addEventListener('click', evt =>  {
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

// Валидация форм
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const toggleButton = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_inactive');
  } else {
      buttonElement.classList.remove('popup__button_inactive');
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButton(inputList, buttonElement);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
          checkInputValidity(formElement, inputElement);
          toggleButton(inputList, buttonElement);
      });
  });
};

const enableValidation = () => {  
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();