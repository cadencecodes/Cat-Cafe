// Wires cats.js CRUD to the Cat Manager admin UI.
// Depends on: storage.js, cats.js (loaded before this script)

document.addEventListener("DOMContentLoaded", () => {
  const form        = document.getElementById("cat-form");
  const submitBtn   = document.getElementById("cat-submit");
  const cancelBtn   = document.getElementById("cat-cancel");
  const errorMsg    = document.getElementById("cat-error");
  const catList     = document.getElementById("cat-list");

  let editingId = null;

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getFormValues() {
    return {
      name:        document.getElementById("cat-name").value,
      breed:       document.getElementById("cat-breed").value,
      age:         document.getElementById("cat-age").value,
      personality: document.getElementById("cat-personality").value,
      photo:       document.getElementById("cat-photo").value,
      adopted:     document.getElementById("cat-adopted").checked,
    };
  }

  function populateForm(cat) {
    document.getElementById("cat-name").value        = cat.name;
    document.getElementById("cat-breed").value       = cat.breed;
    document.getElementById("cat-age").value         = cat.age;
    document.getElementById("cat-personality").value = cat.personality;
    document.getElementById("cat-photo").value       = cat.photo;
    document.getElementById("cat-adopted").checked   = cat.adopted;
  }

  function resetForm() {
    form.reset();
    editingId = null;
    submitBtn.textContent = "Add Cat";
    cancelBtn.hidden = true;
    hideError();
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.hidden = false;
  }

  function hideError() {
    errorMsg.hidden = true;
    errorMsg.textContent = "";
  }

  function validate({ name, breed, age }) {
    if (!name.trim())  return "Please enter the cat's name.";
    if (!breed.trim()) return "Please enter the cat's breed.";
    if (age === "" || Number(age) < 0) return "Please enter a valid age.";
    return null;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  function renderCats() {
    const cats = getCats();
    catList.innerHTML = "";

    if (cats.length === 0) {
      catList.innerHTML = `<p class="res-empty">No cats yet. Add one above!</p>`;
      return;
    }

    cats.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "cat-admin-card";
      card.dataset.id = cat.id;

      card.innerHTML = `
        <div class="cat-admin-photo">
          ${cat.photo
            ? `<img src="${cat.photo}" alt="${cat.name}" />`
            : `<span class="cat-admin-emoji">🐱</span>`
          }
        </div>
        <div class="cat-admin-info">
          <div class="cat-admin-header">
            <strong>${cat.name}</strong>
            ${cat.adopted
              ? `<span class="adopted-badge">Adopted</span>`
              : `<span class="available-badge">Available</span>`
            }
          </div>
          <p class="cat-admin-meta">${cat.breed} &mdash; Age ${cat.age}</p>
          <p class="cat-admin-personality">${cat.personality}</p>
        </div>
        <div class="cat-admin-actions">
          <button class="btn-edit" data-id="${cat.id}">Edit</button>
          <button class="btn-delete" data-id="${cat.id}">Delete</button>
        </div>
      `;

      catList.appendChild(card);
    });
  }

  // ── Event: form submit (add or update) ─────────────────────────────────────

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = getFormValues();
    const error  = validate(values);

    if (error) {
      showError(error);
      return;
    }

    hideError();

    if (editingId) {
      updateCat(editingId, values);
    } else {
      addCat(values);
    }

    resetForm();
    renderCats();
  });

  // ── Event: edit and delete buttons (delegated to cat list) ─────────────────

  catList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("btn-delete")) {
      deleteCat(id);
      renderCats();
      if (editingId === id) resetForm();
      return;
    }

    if (e.target.classList.contains("btn-edit")) {
      const cat = getCats().find((c) => c.id === id);
      if (!cat) return;
      populateForm(cat);
      editingId = id;
      submitBtn.textContent = "Save Changes";
      cancelBtn.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Event: cancel edit ─────────────────────────────────────────────────────

  cancelBtn.addEventListener("click", resetForm);

  // ── Init ───────────────────────────────────────────────────────────────────

  renderCats();
});
