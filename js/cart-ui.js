// Wires cart.js CRUD to the menu and cart panel in the DOM.
// Depends on: storage.js, cart.js (loaded before this script)

document.addEventListener("DOMContentLoaded", () => {
  const cartList    = document.getElementById("cart-list");
  const cartEmpty   = document.getElementById("cart-empty");
  const cartFooter  = document.getElementById("cart-footer");
  const cartTotal   = document.getElementById("cart-total");
  const cartClear   = document.getElementById("cart-clear");

  // ── Render ────────────────────────────────────────────────────────────────

  function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";

    if (cart.length === 0) {
      cartEmpty.hidden = false;
      cartFooter.hidden = true;
      return;
    }

    cartEmpty.hidden = true;
    cartFooter.hidden = false;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.dataset.id = item.id;

      li.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          ${item.tags.length ? `<span class="cart-item-tags">${item.tags.join(", ")}</span>` : ""}
        </div>
        <div class="cart-item-controls">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <input
            class="cart-qty-input"
            type="number"
            min="1"
            max="10"
            value="${item.quantity}"
            data-id="${item.id}"
            aria-label="Quantity for ${item.name}"
          />
          <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `;

      cartList.appendChild(li);
    });

    cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  }

  // ── Event: "Add to Cart" buttons on menu items ────────────────────────────

  // One delegated listener on the menu list handles all add buttons.
  const menuList = document.querySelector(".menu-list");

  menuList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart-btn")) return;

    const li = e.target.closest("li[data-id]");
    if (!li) return;

    addToCart({
      id:       li.dataset.id,
      name:     li.dataset.name,
      price:    parseFloat(li.dataset.price),
      quantity: 1,
      tags:     li.dataset.tags ? li.dataset.tags.split(",") : [],
    });

    renderCart();
  });

  // ── Event: quantity input changes (delegated to cart list) ────────────────

  cartList.addEventListener("change", (e) => {
    if (!e.target.classList.contains("cart-qty-input")) return;

    const id  = e.target.dataset.id;
    const qty = parseInt(e.target.value, 10);

    // updateCartItem auto-removes the item if qty <= 0.
    updateCartItem(id, { quantity: qty });
    renderCart();
  });

  // ── Event: remove buttons (delegated to cart list) ────────────────────────

  cartList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("cart-remove-btn")) return;

    removeCartItem(e.target.dataset.id);
    renderCart();
  });

  // ── Event: clear cart ─────────────────────────────────────────────────────

  cartClear.addEventListener("click", () => {
    clearCart();
    renderCart();
  });

  // ── Init ──────────────────────────────────────────────────────────────────

  renderCart();
});
