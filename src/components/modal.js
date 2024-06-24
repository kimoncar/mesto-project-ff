export { openModal, closeModal };

// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEscape);
};

// Функция закрытия модального окна
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEscape);
}

// Функция закрытия модального окна клавишей Escape
function closeModalEscape(evt) {
  if(evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  };
};