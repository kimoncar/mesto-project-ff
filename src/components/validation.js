

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

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButton = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.class.remove('popup__button_inactive');
    };
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButton(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
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