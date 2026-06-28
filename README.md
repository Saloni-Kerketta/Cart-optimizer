# 🛒 Smart Cart Engine
### AI-Powered Intelligent Shopping Cart & Product Recommendation System

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![Express](https://img.shields.io/badge/Framework-Express-black)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-blueviolet)

---

## 📌 Project Overview

Smart Cart Engine is an AI-powered e-commerce shopping cart system that enhances the online shopping experience by providing intelligent product recommendations while allowing users to seamlessly manage their shopping cart.

Unlike traditional shopping carts, this system combines **Artificial Intelligence**, **Product Similarity**, and **User Purchase Behavior** to recommend products that customers are most likely to buy together.

The project follows a complete **MERN Stack architecture** with secure user authentication and AI-powered recommendations using Google's Gemini API.

# ✨ Features

## 👤 User Authentication

- User Registration
- Secure Login
- Password Encryption using bcrypt
- JWT Authentication
- Protected Routes
---
## 🛍️ Product Management

- View all products
- Product Details
- Search Products
- Product Images
- Product Ratings
- Product Popularity
---
## 🛒 Shopping Cart

- Add Product to Cart
- Remove Product
- Update Quantity
- Clear Cart
- Calculate Total Price
--

## 🤖 AI Recommendation Engine

The recommendation system suggests products based on:
- Product Similarity for which ML Algorithm i.e Apriori used to determine hiw frequently two products are appearing according to some previous dataset
- Product Category
- Rating
- Popularity
- Price Compatibility
- Google Gemini AI Suggestions

Example:
```
User adds:
Wireless Mouse

Recommended:
✔ Mouse Pad
✔ Mechanical Keyboard
✔ USB Hub
```
---
# 🧠 Technologies Used

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Gemini API
---

## Database

MongoDB Atlas
Collections

- Users
- Products
- Cart

---
## APIs
- Google Gemini API
- Pexels API (Product Images)
---

# 📂 Project Structure
```
Smart-Cart-Engine
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── components
│   │      Navbar
│   │      ProductCard
│   │      RecommendationWidget
│   │
│   ├── pages
│   │      Home
│   │      Login
│   │      Signup
│   │      Cart
│   │
│   ├── context
│   ├── App.jsx
│   └── package.json
│
├── backend
│
│   ├── src
│   │
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── services
│   │
│   ├── server.js
│   ├── seedImages.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/smart-cart-engine.git
```
---

## Move to Project
```bash
cd smart-cart-engine
```
---
# Backend Setup

```bash
cd backend

npm install

npm start
```

---

# Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
---

# Environment Variables
Create a `.env` file inside the backend folder.
```
PORT=5000
MONGO_URI=Your MongoDB URI
JWT_SECRET=Your JWT Secret
GEMINI_API_KEY=Your Gemini API Key
PEXELS_API_KEY=Your Pexels API Key
```
---

# Database Collections

## Users
```
_id
name
email
password
```
---
## Products
```
productId
productName
brand
category
price
rating
popularity
buyers
relatedProducts
imageUrl
```
---
## Cart
```
userId
productId
quantity
```
---
# API Endpoints
## User APIs
```
POST /api/users/register
POST /api/users/login
```
---

## Product APIs
```
GET /api/products
GET /api/products/:id
```
---

## Cart APIs
```
GET /api/cart
POST /api/cart/add
PUT /api/cart/update
DELETE /api/cart/remove
```
---
## Recommendation API
```
POST /api/recommendations
```
---
# AI Recommendation Workflow
```
User Login
      │
      ▼
Browse Products
      │
      ▼
Add Product to Cart
      │
      ▼
Cart Data
      │
      ▼
Gemini AI
      │
      ▼
Recommended Products
      │
      ▼
Displayed to User
```

---

# Screenshots

Add screenshots here.

```
Home Page

Login Page

Product Page

Cart

Recommendation Widget
```

---

# Future Improvements

- Collaborative Filtering
- Purchase History Recommendation
- Apriori Algorithm
- Wishlist
- Product Reviews
- Order History
- Payment Gateway
- Admin Dashboard
- Inventory Management
- Email Notifications
- Dark Mode
- Voice Search

---

# Team Members

| Name | Responsibility |
|-------|---------------|
| **Aditya Kumar** | Cart CRUD Operations, MongoDB Integration, Backend Development |
| **Sudhanshu** | Authentication (JWT, Login, Signup) |
| **Saloni Kerketta** | Gemini AI Integration & Recommendation System |

---

# Learning Outcomes

This project demonstrates:

- MERN Stack Development
- REST API Development
- MongoDB Integration
- Authentication using JWT
- AI API Integration
- CRUD Operations
- Product Recommendation System
- Git & GitHub Collaboration
- Team Software Development
---

# Contributing

Contributions are welcome.

1. Fork Repository

2. Create Branch

```
git checkout -b feature-name
```

3. Commit

```
git commit -m "Added feature"
```

4. Push

```
git push origin feature-name
```

5. Open Pull Request
---
# License

This project is developed for educational purposes.
---

# ⭐ If you like this project

Please give the repository a ⭐ on GitHub.

It motivates us to build more awesome open-source projects.
