// Cat Favorites — persisted as an array of cat ID strings in localStorage.
// Depends on: storage.js (must be loaded first)

const FAVORITES_KEY = "purrfect_favorites";

// Returns the current favorites as a Set for O(1) lookup.
function getFavorites() {
  return new Set(storage.get(FAVORITES_KEY));
}

// Saves a cat ID to favorites. No-op if already favorited.
function addFavorite(catId) {
  const favorites = getFavorites();
  favorites.add(catId);
  storage.set(FAVORITES_KEY, [...favorites]);
}

// Removes a cat ID from favorites. No-op if not present.
function removeFavorite(catId) {
  const favorites = getFavorites();
  favorites.delete(catId);
  storage.set(FAVORITES_KEY, [...favorites]);
}

// Returns true if the given cat ID is currently favorited.
function isFavorite(catId) {
  return getFavorites().has(catId);
}

// Toggles a cat's favorite status. Returns the new state (true = now favorited).
function toggleFavorite(catId) {
  if (isFavorite(catId)) {
    removeFavorite(catId);
    return false;
  } else {
    addFavorite(catId);
    return true;
  }
}
