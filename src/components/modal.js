export { openModal, closeModal };

// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEscape);
};

// Функция закрытия модального окна мышкой
function closeModal(modal) {
  modal.addEventListener('click', evt => {
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) {
      modal.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closeModalEscape);
    };
  });
};

// Функция закрытия модального окна клавишей Escape
function closeModalEscape(evt) {
  if(evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEscape);
  };
};

