// Menu Cart CRUD — persisted as an array under a single localStorage key.
// Depends on: storage.js (must be loaded first)

const CART_KEY = "purrfect_cart";

// Returns all cart items. Array is ordered by insertion (first added = first).
function getCart() {
  return storage.get(CART_KEY);
}

// Adds an item to the cart.
// If an item with the same id already exists, increments its quantity instead.
// item must include: id, name, price, quantity, tags (array)
// Returns the updated cart.
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id:       item.id,
      name:     item.name,
      price:    Number(item.price),
      quantity: Number(item.quantity) || 1,
      tags:     Array.isArray(item.tags) ? item.tags : [],
    });
  }

  storage.set(CART_KEY, cart);
  return cart;
}

// Updates a cart item by id. Supports changing quantity only (price/name are
// snapshotted and should not change after adding).
// If quantity is set to 0 or below, the item is removed automatically.
// Returns the updated cart, or null if the id was not found.
function updateCartItem(id, data) {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === id);

  if (index === -1) {
    console.warn(`updateCartItem: no item found with id "${id}"`);
    return null;
  }

  const newQty = Number(data.quantity);

  if (newQty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index] = { ...cart[index], quantity: newQty };
  }

  storage.set(CART_KEY, cart);
  return cart;
}

// Removes a single item from the cart by id.
// Returns the updated cart, or null if the id was not found.
function removeCartItem(id) {
  const cart = getCart();
  const filtered = cart.filter((i) => i.id !== id);

  if (filtered.length === cart.length) {
    console.warn(`removeCartItem: no item found with id "${id}"`);
    return null;
  }

  storage.set(CART_KEY, filtered);
  return filtered;
}

// Removes all items from the cart.
// Returns an empty array.
function clearCart() {
  storage.set(CART_KEY, []);
  return [];
}

// Returns the total price across all cart items (quantity × price per item).
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Returns the total number of individual items in the cart (sum of quantities).
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
