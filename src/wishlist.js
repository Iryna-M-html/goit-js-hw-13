//Логіка сторінки Wishlist
// Імпортуємо функції для роботи з localStorage
import { getFromStorage, saveToStorage, getItemsCount } from './js/storage.js';
// Імпортуємо посилання на DOM-елементи
import { refs } from './js/refs.js';
// Імпортуємо функції рендеру
import { renderProducts, renderEmptyMessage } from './js/render-function.js';
// Імпортуємо функцію отримання одного продукту з API
import { fetchProductById } from './js/products-api.js';
// Імпортуємо функцію відкриття модального вікна
import { openModal } from './js/modal.js';

// Коли DOM повністю завантажений
document.addEventListener('DOMContentLoaded', () => {
  // Отримуємо список товарів із localStorage з ключем "wishlist"
  const wishlistItems = getFromStorage('wishlist');

  // Якщо список порожній — показуємо повідомлення про порожній список
  if (wishlistItems.length === 0) {
    renderEmptyMessage(refs.productsList, 'Your wishlist is empty.');
    return; // Перериваємо виконання далі
  }

  // Інакше — рендеримо товари у список
  renderProducts(wishlistItems, refs.productsList);
});

// Обробник кліку на списку продуктів
refs.productsList.addEventListener('click', async (e) => {
  // Шукаємо батьківський елемент, що містить клас .product-card
  const card = e.target.closest('.product-card');
  if (!card) return; // Якщо клік був не по картці — нічого не робимо

  // Отримуємо ID продукту з атрибута data-id
  const productId = card.dataset.id;

  // Завантажуємо повні дані продукту з API
  const product = await fetchProductById(productId);

  // Відкриваємо модальне вікно з інформацією про продукт
  openModal(product);
});

