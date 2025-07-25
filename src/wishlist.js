//Логіка сторінки Wishlist
import { getFromStorage, saveToStorage } from './storage.js';
import { refs } from './refs.js';
import { renderProducts, renderEmptyMessage } from './render-functions.js';
import { fetchProductById } from './products-api.js';
import { openModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const wishlistItems = getFromStorage('wishlist');

  if (wishlistItems.length === 0) {
    renderEmptyMessage(refs.productsList, 'Your wishlist is empty.');
    return;
  }

  renderProducts(wishlistItems, refs.productsList);
});

refs.productsList.addEventListener('click', async (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  const productId = card.dataset.id;
  const product = await fetchProductById(productId);
  openModal(product);
});