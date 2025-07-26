export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
//Читає дані з localStorage за ключем key.
//Якщо нічого не знайдено — повертає порожній масив [].

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};//Зберігає значення value (масив, об'єкт тощо) у localStorage, попередньо перетворюючи його в JSON-рядок.

export const toggleItemInStorage = (key, item) => {
  const items = getFromStorage(key); // Отримуємо поточні елементи
  const exists = items.find(({ id }) => id === item.id);// Перевірка: чи вже є такий item
  const newItems = exists
    ? items.filter(({ id }) => id !== item.id)// Якщо є — видаляємо
    : [...items, item];// Якщо нема — додаємо
  saveToStorage(key, newItems); // Оновлюємо сховище
};