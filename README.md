Objective:
Build a web application with role-based login (User, Seller, Admin) using a single frontend. Based on the
logged-in role, different functionalities should be available.

Roles & Functionalities:

1. User Login:
   o After login, display a list of products.
   o Products should be fetched from the database.
2. Seller Login:
   o After login, show a form to add new products.
   o The form should include fields like: Product Name, Description, Price, Image URL,
   Category, etc.
   o On form submission, the product data should be saved to the database.
3. Admin Login:
   o After login, display the following:
   ▪ List of all users
   ▪ List of all sellers
   ▪ Payment details (this can be mocked or shown as a static table for now)

## Features

1. User Registration & Login (JWT)
2. Role-based login & redirection (User/Seller/Admin)
3. User dashboard: view products
4. Seller dashboard: Add/view products
5. Admin dashboard: View users, sellers, and payments (mock)
6. MongoDB/Mongoose models
7. TailwindCSS for styling
8. API docs in README
9. Payment: static mock data only

## Tech Stack

- Backend
  - Node + Express
  - MongoDB with mongoose
  - Cloudinary
  - JWT based authentication
  - Nodemailer for Email verification
- Frontend
  - React + Vite
  - TanStack Query
  - Tailwindcss
  - Shadcn UI
  - Axios
  - Zustand

## Local Development Setup

### 1. Prerequisites

- Node.js (LTS)
- MongoDB (local or Atlas)
- Cloudinary account (for product images)
- SMTP-capable email (e.g., Gmail App Password or Mailtrap)
- Git

### 2. Clone

```
git clone https://github.com/abhinayjangde/assignment
cd assignment
```

### 3. Folder Structure (expected)

```
/backend
/frontend
/README.md
```

### 4. Backend Setup

```
cd backend
cp .env.example .env
npm install
```

Run dev:

```
npm run dev
```

### 5. Frontend Setup

Open new terminal:

```
cd frontend
cp .env.example .env
npm install
```

.env (Vite requires VITE\_ prefix):

```
VITE_BACKEND_URL=http://localhost:5000/api
```

Run:

```
npm run dev
```

### 6. Seeding (in backend directory)

Run seed command to write users and products:

```
npm run seed
```

### 7. Default URLs

- Frontend: http://localhost:5173
- API base: http://localhost:9000/api

### 8. Role Promotion (temp manual)

In Mongo shell / Compass update user document:

```
{ "role": "admin" } or { "role": "seller" }
```

### 9. API Documentation (brief)

Auth:

- POST /api/auth/register
- POST /api/auth/login
  Products:
- GET /api/products (user/seller/admin)
- POST /api/products (seller)
  Admin:
- GET /api/admin/users
- GET /api/admin/sellers
- GET /api/admin/payments (mock)
