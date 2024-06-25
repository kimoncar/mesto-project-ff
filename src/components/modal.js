export { openModal, closeModal, closeModalByClick };

// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEscape);
};

// Функция закрытия на все модальные окна по overlay и х
function closeModalByClick(modal) {
  modal.addEventListener('click', evt => {
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(evt.currentTarget);
    };
  });
}

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