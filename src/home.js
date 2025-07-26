import { handleLoad, handleCategoryClick, handleProductClick, handleLoadMore } from './js/handlers.js';
import { refs } from './js/refs.js';

document.addEventListener('DOMContentLoaded', handleLoad);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductClick);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);