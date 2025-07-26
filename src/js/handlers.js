import { fetchProducts, fetchCategories, fetchProductById } from './products-api.js';
import { renderCategories, renderProducts, renderEmptyMessage } from './render-function.js';
import { openModal } from './modal.js';
import { refs } from './refs.js';
import iziToast from 'izitoast';

let page = 1;
let currentCategory = '';
let totalProducts = 0;

//  Завантаження сторінки ===
export const handleLoad = async () => {
  try {
    const categories = await fetchCategories();
    renderCategories(categories, refs.categoriesList);

    const data = await fetchProducts(page);
    totalProducts = data.total;
    renderProducts(data.products, refs.productsList);

    toggleLoadMoreButton(data.products.length);
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  }
};

//  Клік по категорії ===
export const handleCategoryClick = async (e) => {
  if (!e.target.classList.contains('category-btn')) return;

  currentCategory = e.target.textContent;
  page = 1;
  refs.productsList.innerHTML = '';

  try {
    const data = await fetchProducts(page, currentCategory);
    totalProducts = data.total;
    renderProducts(data.products, refs.productsList);

    toggleLoadMoreButton(data.products.length);
    highlightActiveCategory(e.target);
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  }
};

//  Клік по товару ===
export const handleProductClick = async (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  try {
    const productId = card.dataset.id;
    const product = await fetchProductById(productId);
    openModal(product);
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  }
};

// 4. Завантаження наступної сторінки ===
export const handleLoadMore = async () => {
  page += 1;
  try {
    const data = await fetchProducts(page, currentCategory);
    renderProducts(data.products, refs.productsList);
    toggleLoadMoreButton(data.products.length);
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  }
};

//  5. Показ/приховування кнопки Load More ===
const toggleLoadMoreButton = (productsLength) => {
  const totalLoaded = page * 12;
  if (productsLength < 12 || totalLoaded >= totalProducts) {
    refs.loadMoreBtn.classList.add('hidden');
    if (productsLength === 0) {
      renderEmptyMessage(refs.productsList, 'No more products to load.');
    }
  } else {
    refs.loadMoreBtn.classList.remove('hidden');
  }
};

// 6. Підсвітка активної категорії ===
const highlightActiveCategory = (activeButton) => {
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
};