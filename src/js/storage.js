export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const toggleItemInStorage = (key, item) => {
  const items = getFromStorage(key);
  const exists = items.find(({ id }) => id === item.id);
  const newItems = exists
    ? items.filter(({ id }) => id !== item.id)
    : [...items, item];
  saveToStorage(key, newItems);
};