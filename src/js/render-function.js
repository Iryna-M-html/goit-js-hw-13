export const renderCategories = (categories, container) => {
  container.innerHTML = categories.map(
    (cat) => `<li><button class="category-btn">${cat.name}</button></li>`
  ).join('');
};

export const renderProducts = (products, container) => {
  container.innerHTML += products.map(
    (product) => `
      <li class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} $</p>
      </li>
    `
  ).join('');
};

export const renderEmptyMessage = (container, message) => {
  container.innerHTML = `<p class="empty-message">${message}</p>`;
};