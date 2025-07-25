import { handleLoad, handleCategoryClick, handleProductClick, handleLoadMore } from './src/js/handlers.js';
import { refs } from './src/js/refs.js';

document.addEventListener('DOMContentLoaded', handleLoad);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductClick);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);