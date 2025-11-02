# 💸 TripSplit – Node.js + MongoDB

A simple yet powerful API backend to manage group expenses, shared bills, and personal splits. Built with **Express.js**, **MongoDB**, and **OAuth** (Google & Facebook).

---

## 🚀 Features

- ✅ User Registration & Login (Email, Google, Facebook)
- 👥 Group Creation with Invite Links
- 💰 Add Expenses with image upload, payer, and participants
- 📊 Automatically split bills across members
- 🔁 Track who owes whom
- 🧮 Support for multiple groups, users, and expenses

---

## 📁 Folder Structure

```
.
├── controllers/
├── models/
├── routes/
├── services/
├── config/
├── middlewares/
└── utils/
```

---

## 🔐 Authentication

Supports both traditional email/password and OAuth:

- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/google` → Google OAuth
- `/api/auth/facebook` → Facebook OAuth

---

## 📦 API Endpoints

### ✅ Auth APIs

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/auth/google`     | Login with Google OAuth      |
| GET    | `/auth/facebook`   | Login with Facebook OAuth    |
| POST   | `/auth/register`   | Register with email/password |
| POST   | `/auth/login`      | Login with credentials       |
| GET    | `/auth/logout`     | Logout session               |

---

### 👤 User APIs

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | `/users/`          | Get all users         |
| GET    | `/users/:id`       | Get user by ID        |
| PUT    | `/users/:id`       | Update user info      |

---

### 👥 Group APIs

| Method | Endpoint                    | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | `/groups/`                  | List all groups                  |
| POST   | `/groups/`                  | Create group                     |
| PUT    | `/groups/:id/users`         | Add user to group                |
| PUT    | `/groups/:id/expenses`      | Add expense to group             |
| DELETE | `/groups/:id/users`         | Remove user from group           |
| DELETE | `/groups/:id/expenses`      | Remove expense from group        |

---

### 💵 Expense APIs

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/expenses/`     | Add new expense          |
| PUT    | `/expenses/:id`  | Update expense           |
| DELETE | `/expenses/:id`  | Delete expense           |

---

### 🔄 Split APIs

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/splits/`       | Create split record       |
| PUT    | `/splits/:id`    | Update split              |
| DELETE | `/splits/:id`    | Remove split              |

---

## 🧪 Tech Stack

- **Node.js** / **Express**
- **MongoDB** / Mongoose
- **Passport.js** (OAuth2)
- **JWT** for optional auth
- **Multer** for image upload
- **CORS** & session middleware

---

## 📷 ER Diagram

> Users –< Groups –< Expenses  
> Groups –< Splits (Split includes `pay_to` & `get_pay_by` with nested user/amount)

> <img width="654" height="560" alt="image" src="https://github.com/user-attachments/assets/710fdbce-4076-4068-89fd-23d6b587763c" />


---

## 🛠 Setup

```bash
git clone https://github.com/yourname/split-bill-app
cd split-bill-app
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/splitbill
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
SESSION_SECRET=your_secret
```

Run the server:

```bash
npm run dev
```

---

## 🧪 Example Payload

```json
{
  "description": "Dinner",
  "amount": 400000,
  "paid_by": ["user_id1"],
  "paid_for": ["user_id1", "user_id2", "user_id3"]
}
```

---

## 📄 License

MIT © 2025 — Built by @vinhvrs
