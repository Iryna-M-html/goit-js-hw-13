// Розрахунок загальної суми та кількості товарів у кошику
export const calculateTotal = (items) => {
  let totalItems = 0;
  let totalPrice = 0;

  items.forEach(item => {
    totalItems += 1;
    totalPrice += item.price || 0;
  });

  return { totalItems, totalPrice };
};

// Перевірка, чи товар є в сховищі
export const isInStorage = (key, id) => {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  return items.some(item => item.id === id);
};