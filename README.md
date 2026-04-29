# Groceries & Electronics Website 🛒

A modern, fully responsive shopping website built with React and TypeScript. Browse groceries and electronics, manage your cart, and checkout — all with a clean UI and smooth animations.

🔗 **Live Demo:** [grocery-shopping-store.vercel.app](https://grocery-shopping-store.vercel.app)

---

## What it does

- Browse products across groceries and electronics categories
- Add items to cart and manage quantities
- Checkout flow with form validation
- Smooth animations and a clean, responsive UI that works on all screen sizes
- Data served via MirageJS — no real backend needed, everything runs in the browser

---

## Why I built this

Wanted to get hands-on with Redux Toolkit and AsyncThunk in a real-world scenario rather than just tutorials. Using MirageJS to mock an API was a great way to simulate actual async data fetching without spinning up a server.

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| React 19 | UI components and rendering |
| TypeScript | Type safety throughout |
| Redux Toolkit | Global state management |
| AsyncThunk | Async API calls and loading states |
| MirageJS | Mock REST API (fake backend) |
| React Router DOM v7 | Client-side routing |
| React Redux | Connecting Redux store to components |
| Vite | Build tool and dev server |
| CSS | Styling and animations |

---

## How to run it locally

```bash
git clone https://github.com/KhizerAhmad/Groceries-Electronics-Website.git
cd Groceries-Electronics-Website
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
Groceries-Electronics-Website/
│
├── public/              # Static assets
├── src/                 # Main source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   ├── store/           # Redux store, slices, thunks
│   └── mirage/          # MirageJS server setup & mock data
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Features at a glance

- **Product browsing** — product listing with category filtering
- **Cart management** — add, remove, update quantities with live total calculation
- **Checkout validation** — form fields validated before submission
- **Mock API** — MirageJS intercepts fetch requests and returns fake data, simulating real backend behavior
- **Async state handling** — loading, success, and error states managed cleanly with AsyncThunk
- **Fully responsive** — works on mobile, tablet, and desktop

---

## Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Screenshot

> *(Add a screenshot here)*

---

## Author

**Khizer Ahmad** — built this to sharpen Redux Toolkit and async data fetching skills in a practical project.

Feel free to explore, fork, or build on top of it.
