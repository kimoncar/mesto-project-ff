export { createCard, removeCard, toggleLike };
import { cardTemplate } from '../index.js';
import { deleteCard, addLike, deleteLike } from './api.js';

// Функция создания карточки
function createCard(itemCard, idOwner, confirmCallback, openModalImg, toggleLike) {
  const placeCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = placeCard.querySelector('.card__image');
  const cardTitle = placeCard.querySelector('.card__title');
  const removeButton = placeCard.querySelector('.card__delete-button');
  const likeButton = placeCard.querySelector('.card__like-button');
  const countLikes = placeCard.querySelector('.card__like-count');

  // Скрыть кнопку удаления, если карточка не принадлежит пользователю
  if(itemCard.owner._id !== idOwner) {
    removeButton.style.display = 'none';
  }

  // Показать иконку поставленного лайка карточки
  itemCard.likes.forEach((like) => {
    if(like._id === idOwner) {
      likeButton.classList.add('card__like-button_is-active');
    };
  });

  placeCard.id = itemCard._id;
  cardImage.src = itemCard.link;
  cardImage.alt = `Фотография места из региона: ${itemCard.name}`;
  cardTitle.textContent = itemCard.name;
  countLikes.textContent = itemCard.likes.length;
  likeButton.addEventListener('click', (evt) => {
    toggleLike(evt, itemCard._id);
  });
  removeButton.addEventListener('click', (evt) => {
    confirmCallback(evt.target.closest('.card'));
  });
  cardImage.addEventListener('click', () => {
    openModalImg(itemCard);
  });  
  return placeCard;
};

// Удаление карточки
function removeCard(cardItem) {
  deleteCard(cardItem.id)
  .then((res) => {
    cardItem.remove();
  })
  .catch((err) => {
    console.error(err);
  });
};

// Постановка/удаление лайка
function toggleLike(evt, idCard) {
  const countLikes = evt.target.closest('.card').querySelector('.card__like-count');
  if(!evt.target.classList.contains('card__like-button_is-active')) {
    addLike(idCard)
    .then((res) => {
      countLikes.textContent = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.error(err);
    });
  } else {
    deleteLike(idCard)
    .then((res) => {
      countLikes.textContent = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.error(err);
    });
  };
};