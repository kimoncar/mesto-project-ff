import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, addLike } from  './components/card.js';
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
  const newCard = createCard({name: inputCardName.value, link: inputCardUrl.value}, removeCard, openModalImg, addLike);
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
  placesList.append(createCard(itemCard, removeCard, openModalImg, addLike));
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
  modal.addEventListener('click', evt => {
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(modal);
    };
  });
});

// Редактирование профиля
formProfileEdit.addEventListener('submit', profileFormSubmit);

// Добавление карточки
formAddCard.addEventListener('submit', addCardFormSubmit);