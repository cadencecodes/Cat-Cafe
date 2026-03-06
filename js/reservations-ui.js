// Wires reservations.js CRUD to the form and list in the DOM.
// Depends on: storage.js, reservations.js (loaded before this script)

document.addEventListener("DOMContentLoaded", () => {
  const form      = document.getElementById("reservation-form");
  const submitBtn = document.getElementById("res-submit");
  const cancelBtn = document.getElementById("res-cancel");
  const errorMsg  = document.getElementById("res-error");
  const listEl    = document.getElementById("reservations-list");

  // Tracks the ID of the reservation currently being edited, or null.
  let editingId = null;

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getFormValues() {
    return {
      name:   document.getElementById("res-name").value,
      email:  document.getElementById("res-email").value,
      date:   document.getElementById("res-date").value,
      time:   document.getElementById("res-time").value,
      guests: document.getElementById("res-guests").value,
      notes:  document.getElementById("res-notes").value,
    };
  }

  function populateForm(reservation) {
    document.getElementById("res-name").value   = reservation.name;
    document.getElementById("res-email").value  = reservation.email;
    document.getElementById("res-date").value   = reservation.date;
    document.getElementById("res-time").value   = reservation.time;
    document.getElementById("res-guests").value = reservation.guests;
    document.getElementById("res-notes").value  = reservation.notes;
  }

  function resetForm() {
    form.reset();
    editingId = null;
    submitBtn.textContent = "Book Table";
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

  function validate({ name, email, date, time, guests }) {
    if (!name.trim())  return "Please enter your name.";
    if (!email.trim() || !email.includes("@")) return "Please enter a valid email.";
    if (!date)         return "Please select a date.";
    if (!time)         return "Please select a time.";
    if (!guests || guests < 1) return "Please enter at least 1 guest.";
    return null;
  }

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
  }

  function formatTime(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  function renderReservations() {
    const reservations = getReservations();
    listEl.innerHTML = "";

    if (reservations.length === 0) {
      listEl.innerHTML = `<p class="res-empty">No reservations yet. Book your first visit above!</p>`;
      return;
    }

    reservations.forEach((res) => {
      const card = document.createElement("div");
      card.className = "res-card";
      card.dataset.id = res.id;

      card.innerHTML = `
        <div class="res-card-info">
          <strong>${res.name}</strong>
          <p>${formatDate(res.date)} at ${formatTime(res.time)} &mdash; ${res.guests} guest${res.guests !== 1 ? "s" : ""}</p>
          <p>${res.email}</p>
          ${res.notes ? `<p><em>${res.notes}</em></p>` : ""}
        </div>
        <div class="res-card-actions">
          <button class="btn-edit" data-id="${res.id}">Edit</button>
          <button class="btn-delete" data-id="${res.id}">Cancel</button>
        </div>
      `;

      listEl.appendChild(card);
    });
  }

  // ── Event: form submit (create or update) ──────────────────────────────────

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = getFormValues();
    const error = validate(values);

    if (error) {
      showError(error);
      return;
    }

    hideError();

    if (editingId) {
      updateReservation(editingId, values);
    } else {
      addReservation(values);
    }

    resetForm();
    renderReservations();

    // Scroll the list into view so the user can see the new card.
    listEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ── Event: edit and delete (delegated to list container) ───────────────────

  listEl.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("btn-delete")) {
      deleteReservation(id);
      renderReservations();
      if (editingId === id) resetForm();
      return;
    }

    if (e.target.classList.contains("btn-edit")) {
      const reservation = getReservations().find((r) => r.id === id);
      if (!reservation) return;
      populateForm(reservation);
      editingId = id;
      submitBtn.textContent = "Save Changes";
      cancelBtn.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // ── Event: cancel edit ─────────────────────────────────────────────────────

  cancelBtn.addEventListener("click", resetForm);

  // ── Init ───────────────────────────────────────────────────────────────────

  renderReservations();
});
