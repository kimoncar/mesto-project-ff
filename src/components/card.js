export { createCard, removeCard, toggleLike };
import { cardTemplate } from '../index.js';

// Функция создания карточки
function createCard(itemCard, removeCallback, openModalImg, addLike) {
  const placeCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placeCard.querySelector('.card__image');
  const cardTitle = placeCard.querySelector('.card__title');
  const removeButton = placeCard.querySelector('.card__delete-button');
  const likeButton = placeCard.querySelector('.card__like-button');
  const countLikes = placeCard.querySelector('.card__like-count');

  cardImage.src = itemCard.link;
  cardImage.alt = `Фотография места из региона: ${itemCard.name}`;
  cardTitle.textContent = itemCard.name;
  countLikes.textContent = itemCard.likes.length;
  likeButton.addEventListener('click', toggleLike);
  removeButton.addEventListener('click', removeCallback);
  cardImage.addEventListener('click', () => {
    openModalImg(itemCard);
  });
  
  return placeCard;
};

// Удаление карточки
function removeCard(evt) {
  evt.target.closest('.card').remove();
};

// Лайк
function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}