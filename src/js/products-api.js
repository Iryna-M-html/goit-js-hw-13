const BASE_URL = 'https://dummyjson.com';

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch categories`);
  return res.json(); // Повертає масив категорій
};

export const fetchProducts = async (page = 1, category = '') => {
  const limit = 12;
  const skip = (page - 1) * limit;

  let url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    : `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch products`);
  return res.json(); // Повертає { products: [], total, limit, skip }
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}: Product not found`);
  return res.json(); // Повертає один продукт
};