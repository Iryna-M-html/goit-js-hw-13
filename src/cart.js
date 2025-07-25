//Логіка сторінки Cart
import { getFromStorage } from './storage.js';
import { refs } from './refs.js';
import { renderProducts, renderEmptyMessage } from './render-functions.js';
import { fetchProductById } from './products-api.js';
import { openModal } from './modal.js';
import { calculateTotal } from './helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = getFromStorage('cart');

  if (cartItems.length === 0) {
    renderEmptyMessage(refs.productsList, 'Your cart is empty.');
    refs.totalContainer.innerHTML = '';
    return;
  }

  renderProducts(cartItems, refs.productsList);

  const { totalItems, totalPrice } = calculateTotal(cartItems);
  refs.totalContainer.innerHTML = `
    <p>Items: ${totalItems}</p>
    <p>Total: $${totalPrice.toFixed(2)}</p>
    <button class="pay-btn">Pay now</button>
  `;
});

refs.productsList.addEventListener('click', async (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  const productId = card.dataset.id;
  const product = await fetchProductById(productId);
  openModal(product);
});