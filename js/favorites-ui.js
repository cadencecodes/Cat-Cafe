// Wires favorites.js logic to the cat cards in the DOM.
// Depends on: storage.js, favorites.js (loaded before this script)

function updateBtn(btn, catId) {
  const favorited = isFavorite(catId);
  btn.textContent = favorited ? "♥" : "♡";
  btn.classList.toggle("favorited", favorited);
}

function initFavorites() {
  document.querySelectorAll(".fav-btn[data-cat-id]").forEach((btn) => {
    const catId = btn.dataset.catId;

    // Restore state from localStorage on page load.
    updateBtn(btn, catId);

    btn.addEventListener("click", () => {
      toggleFavorite(catId);
      updateBtn(btn, catId);
    });
  });
}

// initFavorites() is called by cats-public.js after cards are rendered.
