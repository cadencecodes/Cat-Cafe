# Purrfect Pear Cat Cafe

A cat cafe website where visitors can browse cats available for adoption, along with drinks the cafe offers. Staff can manage cat listings through a secure admin portal.

---

## Features

- **Public adoption listings:** Visitors can browse all cats currently available for adoption on the home page. Listings update in real time — no refresh necessary.
- **Staff login/signup:** Admin staff can create an account or log in via a dedicated login page using email and password.
- **Protected admin dashboard:** Only authenticated staff can access the admin panel.
- **Add & edit cats:** Staff can add new cats (name, age, breed, description, photo URL) and edit or remove existing listings.
- **Persistent database:** All cat data is stored in Firebase Firestore and persists across sessions and page reloads.

---

## Technology Stack

- **HTML / CSS / JavaScript**
- **Firebase Authentication** — Email/password login and signup for admin staff
- **Firebase Firestore** — Real-time database for storing and displaying cat listings
- **Firebase** is loaded via CDN `<script>` tags — no build step required

---

## How to Run It

**Local:**
1. Clone the repository and open `index.html` in your browser, or use VS Code Live Server.

**Deployed:**

Live site: [purrfectpear.netlify.app](https://purrfectpear.netlify.app)

To deploy your own copy:
1. Push the repository to GitHub
2. Connect the repo to Netlify and set the publish directory to `/`
3. In the Firebase console, add your Netlify domain under **Authentication → Settings → Authorized Domains**
