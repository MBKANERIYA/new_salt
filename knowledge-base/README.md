# Salt & Glitz — Knowledge Base

## Project Overview
Salt & Glitz is an e-commerce jewelry platform with a React frontend (Vite) and Express.js/MongoDB backend.

## Tech Stack
| Layer     | Technology |
|-----------|-----------|
| Frontend  | React 18 + Vite 6, Redux Toolkit, Bootstrap 5, react-slick, axios |
| Backend   | Express.js, Mongoose (MongoDB Atlas), JWT auth, AWS S3 for uploads |
| Database  | MongoDB Atlas (`cluster0.muzbcpc.mongodb.net/saltandglitz`) |
| Auth      | JWT + Firebase (Google sign-in) + OTP (email) |
| Styling   | External CSS files in `/public/assets/css/`, Bootstrap 5, Poppins font |

## Directory Structure
```
d:\new Salt\
├── backend/
│   ├── src/
│   │   ├── app.js              # Entry point (port 5000)
│   │   ├── Controller/         # Route handlers
│   │   ├── Model/              # Mongoose schemas
│   │   ├── Routes/v1/          # All v1 API routes
│   │   ├── Services/           # Business logic services
│   │   ├── middleware/          # auth.js, multer.js, upload.js, firebaseAdmin.js
│   │   └── db/dbconnection.js  # MongoDB connection
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── Pages/              # Mainpage, Process (Cart, Login, etc), Product, Verify
│   │   ├── Category/           # Category-specific pages (Rings, Earrings, etc)
│   │   ├── Components/         # Header, Footer, Helmet, firebase config
│   │   ├── Store/Slice/        # Redux slices (CartSlice)
│   │   ├── Utils/              # apiConfig.js, formateCurrency.jsx
│   │   ├── Filter/             # Filter, Mdfilter, Sort components
│   │   ├── Admindashboard/     # Admin pages
│   │   ├── UserProfile/        # User profile pages
│   │   └── Policies/           # Exchange, Return, Warranty
│   ├── public/assets/          # Static CSS, images
│   └── index.html              # Entry HTML
└── knowledge-base/             # This folder
```

## Reading Order
| File | Description |
|------|-------------|
| `README.md` | This file — project overview and architecture |
| `changelog.md` | History of all changes |
| `api-routes.md` | Backend API route documentation |

## Critical Rules
1. **API Base URL**: All frontend API calls use `API_BASE_URL` from `Utils/apiConfig.js` (defaults to `http://localhost:5000`)
2. **Guest Users**: Guest users get UUID strings as `userId` stored in `localStorage("guestUserId")`. The backend must accept both ObjectIds AND string UUIDs.
3. **Cart Schema**: `userId` is `String` type (not ObjectId) to support both registered users and guests.
4. **Auth Middleware**: Always check for `Authorization` header existence before calling `.replace()`.
5. **Google Login**: Destructure `name` from Firebase token, then split into `firstName`/`lastName`.
6. **Rating API**: Frontend expects `approvedRating` array with `userId._id`, `userRating`, `userReview` fields.
7. **Backend self-calls**: NEVER use `axios.get("http://localhost:5000/...")` inside controllers. Use service layer directly.

## Quick Facts
| Key | Value |
|-----|-------|
| Frontend Port | 3000 |
| Backend Port  | 5000 |
| Frontend Start | `npm start` (runs `vite`) |
| Backend Start  | `npm start` (runs `nodemon ./src/app.js`) |
| DB Connection  | MongoDB Atlas via `MONGO_URL` in `.env` |
| JWT Secret     | `SALTANGLITZ` |
| Product Model  | `Upload` (collection: `uploads`) |
| Cart Model     | `Cart` (collection: `carts`) |
| Wishlist Model | `Wishlist` (collection: `wishlists`) |
