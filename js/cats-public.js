// Fetches cats from Firestore and renders them on the public home page.
// Depends on: firebase.js (db must be initialized first)

(async () => {
  const grid = document.getElementById("cats-grid");

  try {
    const snap = await db.collection("cats").orderBy("name").get();

    grid.innerHTML = "";

    if (snap.empty) {
      grid.innerHTML = `<p class="cats-loading">No cats to display yet. Check back soon!</p>`;
      return;
    }

    snap.forEach((doc) => {
      const cat  = doc.data();
      const id   = doc.id;
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${cat.photo
          ? `<div class="cat-card-photo"><img src="${cat.photo}" alt="${cat.name}" /></div>`
          : `<div class="cat-icon">🐱</div>`
        }
        <h3>${cat.name}</h3>
        <p class="cat-card-meta">Age ${cat.age} &mdash; ${cat.breed}</p>
        ${cat.personality ? `<p>${cat.personality}</p>` : ""}
        <button class="fav-btn" data-cat-id="${id}">♡</button>
      `;

      grid.appendChild(card);
    });

    // Initialize favorites now that the cards exist in the DOM.
    initFavorites();

  } catch (err) {
    console.error("Failed to load cats:", err);
    grid.innerHTML = `<p class="cats-loading">Couldn't load cats right now. Please try again later.</p>`;
  }
})();
