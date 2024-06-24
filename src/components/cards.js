const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kareliya = new URL('../images/kareliya.jpg', import.meta.url);
const komsomolsk = new URL('../images/komsomolsk-on-amur.jpg', import.meta.url);
const primorskij = new URL('../images/primorskij-kraj.jpg', import.meta.url);
const sochi = new URL('../images/sochi.jpg', import.meta.url);
const yakutiya = new URL('../images/yakutiya.jpg', import.meta.url);

export const initialCards = [
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Карелия",
      link: kareliya,
    },
    {
      name: "Комсомольск-на-Амуре",
      link: komsomolsk,
    },
    {
      name: "Приморский край",
      link: primorskij,
    },
    {
      name: "Сочи",
      link: sochi,
    },
    {
      name: "Якутия",
      link: yakutiya,
    }
];