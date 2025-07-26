//набір посилань на DOM-елементи

export const refs = {
  categoriesList: document.querySelector('ul.categories'), // Список категорій товарів
  productsList: document.querySelector('ul.products'),     // Список товарів
  loadMoreBtn: document.querySelector('.load-more-btn'),   // Кнопка "Завантажити ще"
  modal: document.querySelector('#modal'),                 // Контейнер модального вікна
  modalContent: document.querySelector('#modal .modal__content'), // Вміст модального вікна
  wishlistCounter: document.querySelector('#wishlist-count'),     // Лічильник "У бажаному"
  cartCounter: document.querySelector('#cart-count'),             // Лічильник "У кошику"
  totalContainer: document.querySelector('.cart-summary'),        // Блок підсумку кошика
  summaryItemsCount:document.querySelector('#cart-items'),
  summaryItemsPrice:document.querySelector('#cart-items-price')
};

