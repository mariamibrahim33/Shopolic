# 🛍️ Shopolic

A full-stack e-commerce store with a modern, minimal fashion aesthetic — built with **Angular 19** on the front end and a **Node/Express + MongoDB** REST API on the back end.

Customers can browse products by category, add to a persistent cart, and check out (paying by cash or card). Admins get a protected dashboard to manage the catalogue.

---

## ✨ Features

- **Storefront** — hero, category showcase, and product pages for Men / Women / Kids / Beauty, plus an "All Products" page
- **Product detail modal** with quick "Add to Cart"
- **Persistent cart** (survives refresh) with live header badge, quantity controls, and totals
- **Checkout** with shipping form, order summary, and **Cash on Delivery or Credit Card** payment
- **Authentication** — register & login with JWT, passwords hashed with bcrypt
- **Roles** — regular users shop; **admins** are routed to a dashboard to add / edit / delete products
- **Route guards** — dashboard is admin-only; checkout requires sign-in (guests are returned to checkout after logging in)
- **Image uploads** — admins upload product photos; served from the API

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 19 (standalone components), TypeScript, RxJS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Uploads | Multer |

---

## ✅ Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** running locally (or a MongoDB Atlas connection string)

Start a local MongoDB (macOS example):

```bash
brew services start mongodb-community
# or run it directly:
mongod --dbpath ~/data/db
```

---

## 🚀 Getting Started

The app has **two parts that must both be running**: the backend API (port **3000**) and the Angular app (port **4200**).

### 1. Backend (API)

```bash
cd server
npm install
cp .env.example .env      # then edit .env if your MongoDB URI differs
npm run seed              # loads sample products + a demo admin account
npm start                 # → http://localhost:3000
```

You should see `✓ Connected to MongoDB` and `✓ Shopolic API on http://localhost:3000`.

### 2. Frontend (Angular)

In a **separate terminal**, from the project root:

```bash
npm install
npm start                 # → http://localhost:4200
```

Open **http://localhost:4200** in your browser.

---

## 🔑 Demo Accounts

The seed script creates an admin account:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@shopolic.com` | `admin123` |

- Log in as the **admin** → you're taken to the **Dashboard** to manage products.
- **Register** a new account (or log in as any non-admin) → you shop as a **customer**.

---

## 🖼️ Adding Product Photos

The seed data ships with clean placeholder images. To use real photos:

1. Rename each photo to one of the names listed in [`server/product-photos/README.md`](server/product-photos/README.md) (e.g. `denim-jacket.jpg`).
2. Drop the files into `server/product-photos/`.
3. From the `server/` folder, run:
   ```bash
   npm run images
   ```
4. Refresh the app.

You can also add/edit products (with image upload) directly from the **admin Dashboard**.

---

## 📜 Useful Scripts

**Backend** (`/server`)
| Command | Description |
|---------|-------------|
| `npm start` | Start the API server |
| `npm run dev` | Start with auto-reload on file changes |
| `npm run seed` | Reset the DB with sample products + demo admin |
| `npm run images` | Import photos from `product-photos/` into the catalogue |

**Frontend** (project root)
| Command | Description |
|---------|-------------|
| `npm start` | Start the Angular dev server |
| `npm run build` | Production build into `dist/` |

---

## 📁 Project Structure

```
Shopolic/
├── src/                        # Angular frontend
│   ├── app/
│   │   ├── components/         # header, home, product pages, cart, checkout, dashboard, footer…
│   │   ├── services/           # auth, shop, cart, order, dashboard
│   │   ├── guards/             # authGuard (login), adminGuard (admin-only)
│   │   └── interceptors/       # attaches JWT to API requests
│   └── styles.css              # global design system (tokens, typography, buttons)
└── server/                     # Express + MongoDB API
    ├── src/
    │   ├── models/             # Product, User, Order
    │   ├── controllers/        # request handlers
    │   ├── routes/             # /product, /user, /order
    │   ├── middleware/         # JWT auth, image upload
    │   ├── seed.js             # sample data
    │   └── index.js            # server entry
    ├── assets/                 # served product images
    └── product-photos/         # drop-in folder for your own photos
```

---

## 🔌 API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/product?category=` | – | List products (optionally by category) |
| GET | `/product/:id` | – | Get one product |
| POST | `/product` · `/product/upload` | – | Create product (multipart image) |
| PUT | `/product/:id` | – | Update product |
| DELETE | `/product/:id` | – | Delete product |
| POST | `/user/register` | – | Register, returns JWT |
| POST | `/user/login` | – | Login, returns JWT |
| POST | `/order` | ✅ | Place an order |
| GET | `/order` | ✅ | List the logged-in user's orders |

---

## 📝 Notes

- To deploy publicly, point `MONGO_URI` at a cloud database (e.g. MongoDB Atlas) and update the API URLs in the Angular services if the backend is hosted elsewhere.
- `.env` is git-ignored — copy `.env.example` and set your own `JWT_SECRET`.
