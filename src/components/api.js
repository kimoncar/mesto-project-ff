// Конфигурация подключения
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '91045e6a-03df-4cc6-b344-7f611579ceae',
    'Content-Type': 'application/json'
  }
};

// Запрос информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};