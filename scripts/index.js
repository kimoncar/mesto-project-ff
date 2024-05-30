// @todo: Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addPlaceCard(name, link, removeCallback) {
  const placeCard = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const removeButton = placeCard.querySelector('.card__delete-button');

  placeCard.querySelector('.card__image').setAttribute('src', link);
  placeCard.querySelector('.card__image').setAttribute('alt', `Фотография места из региона: ${name}`);
  placeCard.querySelector('.card__title').textContent = name;
  placesList.append(placeCard);

  removeButton.addEventListener('click', function(evt) {
    removeCallback(evt.target.parentElement);
  });
};

// @todo: Функция удаления карточки
function removePlaceCard(placeCard) {
  placeCard.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(itemCard) {
  addPlaceCard(itemCard.name, itemCard.link, removePlaceCard);
});