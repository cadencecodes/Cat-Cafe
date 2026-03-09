# Purrfect Pear Cat Cafe

A cozy, pear-themed cat cafe website where visitors can explore resident cats, browse the handcrafted drink menu, and reserve their table. Designed with warm green and pear tones for a welcoming, nature-inspired feel. All features are functional and persist data in the browser using localStorage.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Scripting | JavaScript (vanilla) |
| Data | localStorage (browser persistence) |
| Version Control | Git / GitHub |
| Deployment | Netlify |
| AI Assistance | Claude Code |

---

## Completed Features

1. **Cat Favorites** — Users can favorite resident cats; selections persist across page reloads.
2. **Interactive Reservations Form** — Users can book, edit, and cancel a table; reservations are saved in localStorage and persist on page refresh.
3. **Cart / Menu Functionality** — Add drinks to a cart, adjust quantities, and remove items; cart persists while browsing.
4. **Cat Manager Admin Panel** — Staff can create, edit, and delete cat profiles via a dedicated admin page backed by localStorage.
5. **Responsive Design** — Works smoothly on desktop and mobile.
6. **Iterative Visual Design** — Three rounds of style improvements, including font and color updates, logo refinements, and a subtle pear watermark.

---

## Setup Instructions

This is a static website — no build tools or dependencies required.

### Run Locally

**Option 1: Open directly in browser**
1. Clone the repository:
   ```bash
   git clone https://github.com/cadencecodes/Cat-Cafe.git
   cd Cat-Cafe
   ```
2. Open `index.html` in your browser.

**Option 2: Use a local dev server (recommended)**

With the VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension:
1. Open the project folder in VS Code
2. Right-click `index.html` and select **Open with Live Server**

Or with Python:
```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

### Deployment

The site is live at [purrfectpear.netlify.app](https://purrfectpear.netlify.app/). To deploy your own copy:
1. Push the repository to GitHub
2. Connect the repo to Netlify
3. Set the publish directory to `/` (root)
4. Deploy — no build command needed

---

## Known Bugs & Limitations

- No actual images for cats or menu items are included; placeholders are used for layout.
- Data is stored only in the browser (localStorage); it is not shared across devices.
- The design could be further enhanced with more decorative visuals or animations.
- No backend or authentication; all functionality is client-side only.

---

## What I Learned

<!-- Add 3-5 sentences here about your AI development experience.
     Example topics: how prompting changed as you worked, where AI helped most,
     a moment you pushed back on a suggestion, what you'd do differently. -->

---

## Folder Structure

```
CatCafe/
├── index.html              # Main landing page
├── admin.html              # Cat Manager admin panel
├── styles.css              # Global stylesheet
├── .gitignore
├── README.md
├── TRANSCRIPT-HIGHLIGHTS.md
│
└── js/                     # JavaScript — logic and UI wiring
    ├── storage.js          # Shared localStorage helpers
    ├── favorites.js        # Cat favorites CRUD
    ├── favorites-ui.js     # Favorites wired to DOM
    ├── reservations.js     # Reservations CRUD
    ├── reservations-ui.js  # Reservations form and list UI
    ├── cart.js             # Menu cart CRUD
    ├── cart-ui.js          # Cart wired to menu and DOM
    ├── cats.js             # Cat profiles CRUD
    └── cats-ui.js          # Cat Manager admin UI
```

---

## Live Site

Deployed at: https://purrfectpear.netlify.app
