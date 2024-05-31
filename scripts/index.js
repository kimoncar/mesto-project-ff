// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// Функция создания карточки
function createCard(name, link, removeCallback) {
  const placeCard = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placeCard.querySelector('.card__image');
  const cardTitle = placeCard.querySelector('.card__title');
  const removeButton = placeCard.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = `Фотография места из региона: ${name}`;
  cardTitle.textContent = name;
  removeButton.addEventListener('click', removeCallback);

  return placeCard;
};

// Функция удаления карточки
function removeCard(placeCard) {
  placeCard.target.parentElement.remove();
};

// Вывести карточки на страницу
initialCards.forEach(function(itemCard) {
  placesList.append(createCard(itemCard.name, itemCard.link, removeCard));
});