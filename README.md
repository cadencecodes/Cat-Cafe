# Purrfect Pear Cat Cafe

A cozy, pear-themed cat cafe website where visitors can explore resident cats, browse the handcrafted drink menu, and reserve thir table. Designed with warm green and pear tones for a welcoming, nature-inspired feel. All features are funtional and persist data in the browser using localStorage.

---

## Completed Features

1. **Cat Favorites** — Users can favorite resident cats; selections persist across page reloads.
2. **Interactive Reservations Form** — Users can book, edit, and cancel a table; reservations are saved in localStorage and persist on page refresh.
3. **Cart / Menu Functionality** — Add drinks to a cart, adjust quantities, and remove items; cart persists while browsing.
4. **Cat Manager Admin Panel** — Staff can create, edit, and delete cat profiles via a dedicated admin page backed by localStorage.
5. **Responsive Design** — Works smoothly on desktop and mobile.
6. **Iterative Visual Design** — Three rounds of style improvements, including font and color updates, logo refinements, and a subtle pear watermark.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5                             |
| Styling    | CSS3 (custom properties, grid, flexbox) |
| Scripting  | JavaScript (vanilla)              |
| Data       | localStorage (browser persistence)|
| Version Control | Git / GitHub                 |
| Deployment | Netlify                           |
| AI Assistance| Claude Code                     |


---

## Folder Structure

```
 CatCafe/
  ├── index.html          # Main landing page
  ├── admin.html          # Cat Manager admin panel
  ├── styles.css          # Global stylesheet
  ├── .gitignore
  ├── README.md
  ├── TRANSCRIPT-HIGHLIGHTS.md
  │
  └── js/                 # JavaScript — logic and UI wiring
      ├── storage.js          # Shared localStorage helpers
      ├── favorites.js        # Cat favorites CRUD
      ├── favorites-ui.js     # Favorites wired to DOM
      ├── reservations.js     # Reservations CRUD
      ├── reservations-ui.js  # Reservations form and list UI
      ├── cart.js             # Menu cart CRUD
      ├── cart-ui.js          # Cart wired to menu and DOM
      ├── cats.js             # Cat profiles CRUD
      └── cats-ui.js          # Cat Manager admin UI

  ---

  ## Live Site

  Deployed at: https://purrfectpear.netlify.app

```
