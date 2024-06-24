export { createCard, removeCard, addLike };
import { cardTemplate } from '../index.js';

// Функция создания карточки
function createCard(itemCard, removeCallback, openModalImg, addLike) {
  const placeCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placeCard.querySelector('.card__image');
  const cardTitle = placeCard.querySelector('.card__title');
  const removeButton = placeCard.querySelector('.card__delete-button');
  const likeButton = placeCard.querySelector('.card__like-button');

  cardImage.src = itemCard.link;
  cardImage.alt = `Фотография места из региона: ${itemCard.name}`;
  cardTitle.textContent = itemCard.name;
  removeButton.addEventListener('click', removeCallback);
  likeButton.addEventListener('click', addLike);
  cardImage.addEventListener('click', () => {
    openModalImg(itemCard);
  });
  
  return placeCard;
};

// Удаление карточки
function removeCard(evt) {
  evt.target.parentElement.remove();
};

// Лайк
function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}