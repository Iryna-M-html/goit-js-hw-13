import { getFromStorage, toggleItemInStorage } from './storage.js';
import { refs } from './refs.js';

let currentProduct = null;

export const openModal = (product) => {
  currentProduct = product;
  refs.modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}">
    <p>${product.description}</p>
    <button id="wishlist-btn">${isInStorage('wishlist', product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
    <button id="cart-btn">${isInStorage('cart', product.id) ? 'Remove from Cart' : 'Add to Cart'}</button>
  `;

  refs.modal.classList.add('is-open');
  document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = () => {
  refs.modal.classList.remove('is-open');
  document.removeEventListener('keydown', handleEscapeKey);
};

const handleEscapeKey = (e) => {
  if (e.key === 'Escape') closeModal();
};

function isInStorage(key, id) {
  return getFromStorage(key).some(item => item.id === id);
}