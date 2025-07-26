export const renderCategories = (categories, container) => {
  container.innerHTML = categories.map(
    (cat) => `<li><button class="category-btn">${cat.name}</button></li>`
  ).join('');
};

export const renderProducts = (products, container) => {
  container.innerHTML += products.map(
    (product) => `
      <li class="product-card" data-id="${product.id}">
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} $</p>
        <button type=button>Add to card</button>
      </li>
    `
  ).join('');
};

export const renderEmptyMessage = (container, message) => {
  container.innerHTML = `<p class="empty-message">${message}</p>`;
};