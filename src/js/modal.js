//Імпорт функцій для роботи зі сховищем (localStorage) та DOM-елементів.

import { getFromStorage, toggleItemInStorage, getItemsCount } from './storage.js';
import { refs } from './refs.js';

let currentProduct = null;// Змінна для збереження поточного товару, відкритого в модалці.

export const openModal = (product) => {
  currentProduct = product;
  //// Вставляє HTML з інфо про товар
  refs.modalContent.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.thumbnail}" alt="${product.title}">
    <p>${product.description}</p>
    <button class="modal-product__btn--wishlist" id="wishlist-btn">${isInStorage('wishlist', product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
    <button class="modal-product__btn--cart" id="cart-btn">${isInStorage('cart', product.id) ? 'Remove from Cart' : 'Add to Cart'}</button>
  `;
  const wishlistBtn = document.querySelector('.modal-product__btn--wishlist');
  wishlistBtn.addEventListener('click', handleWishlistClick );
  
  const cartBtn = document.querySelector('.modal-product__btn--cart');
  cartBtn.addEventListener('click', handleCartClick );
  
  refs.modal.classList.add('modal--is-open');// Відкриває модалку
  //Закриває модалку, якщо натиснута клавіша Escape
  document.addEventListener('keydown', handleEscapeKey);//Додає закриття по Escape
};

const handleWishlistClick = (e) => {
  toggleItemInStorage('wishlist', currentProduct);
  const btn = e.currentTarget;
  btn.textContent = isInStorage('wishlist', currentProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist';
  refs.wishlistCounter.textContent = getItemsCount('wishlist');
}
  
const handleCartClick = (e) => {
  toggleItemInStorage('cart', currentProduct);
  const btn = e.currentTarget; 
  btn.textContent = isInStorage('cart', currentProduct.id) ? 'Remove from Cart' : 'Add to Cart';
  refs.cartCounter.textContent = getItemsCount('cart');
}
  
export const closeModal = () => {
  refs.modal.classList.remove('modal--is-open');// Закриває модалку
  document.removeEventListener('keydown', handleEscapeKey);// Прибирає обробник Escape
};

const handleEscapeKey = (e) => {
  if (e.key === 'Escape') closeModal();
};//Закриває модалку, якщо натиснута клавіша Escape

function isInStorage(key, id) {
  return getFromStorage(key).some(item => item.id === id);
}
//Повертає true, якщо товар з таким id вже є у сховищі за ключем (wishlist, cart).
