//Логіка сторінки Cart
import { getFromStorage, getItemsCount } from './js/storage.js';
import { refs } from './js/refs.js';
import { renderProducts, renderEmptyMessage } from './js/render-function.js';
import { fetchProductById } from './js/products-api.js';
import { openModal } from './js/modal.js';
import { calculateTotal } from './js/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = getFromStorage('cart');
  if (cartItems.length === 0) {
    renderEmptyMessage(refs.productsList, 'Your cart is empty.');
    // refs.totalContainer.innerHTML = '';
    // return;
  }

  renderProducts(cartItems, refs.productsList);

  const { totalItems, totalPrice } = calculateTotal(cartItems);
  refs.summaryItemsCount.textContent = totalItems;
  refs.summaryItemsPrice.textContent = `$${Number(totalPrice.toFixed(2))}`;
});

let currentProduct = null;

export const openCartModal = (product) => {
  currentProduct = product;

  const isInCart = isInStorage('cart', product.id);

  refs.modalContent.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.thumbnail}" alt="${product.title}">
    <p>${product.description}</p>
    <button id="cart-btn">
      ${isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  `;

  refs.modal.classList.add('modal--is-open');
  document.addEventListener('keydown', handleEscapeKey);

  // Додаємо слухача подій на кнопку
  document.getElementById('cart-btn').addEventListener('click', handleCartToggle);
  updateCartCounter();
};

const handleEscapeKey = (e) => {
  if (e.key === 'Escape') closeModal();
};

export const closeModal = () => {
  refs.modal.classList.remove('modal--is-open');
  document.removeEventListener('keydown', handleEscapeKey);
};

function isInStorage(key, id) {
  return getFromStorage(key).some(item => item.id === id);
}

function handleCartToggle() {
  toggleItemInStorage('cart', currentProduct);
  updateCartButton();
  updateCartCounter();
}

function updateCartButton() {
  const cartBtn = document.getElementById('cart-btn');
  const isInCart = isInStorage('cart', currentProduct.id);
  cartBtn.textContent = isInCart ? 'Remove from Cart' : 'Add to Cart';
}

function updateCartCounter() {
  const cartItems = getFromStorage('cart');
  const count = cartItems.length;
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Оновлення в шапці
  const navCount = document.querySelector('.nav__count');
  if (navCount) navCount.textContent = count;

  // Оновлення в aside
  const countEl = document.querySelector('[data-count]');
  const priceEl = document.querySelector('[data-price]');
  if (countEl) countEl.textContent = count;
  if (priceEl) priceEl.textContent = `$${total}`;
}