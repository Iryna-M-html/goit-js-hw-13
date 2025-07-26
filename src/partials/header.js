import { refs } from '../js/refs.js';
import { getItemsCount } from '../js/storage.js';

document.addEventListener('DOMContentLoaded', () => {
  refs.wishlistCounter.textContent = getItemsCount('wishlist');
  refs.cartCounter.textContent = getItemsCount('cart');
});
