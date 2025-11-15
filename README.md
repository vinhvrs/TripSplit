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


# 🧾 TripSplit API Report — Extended Version

This document includes **full API tables**, **sample requests**, and **expected outputs** for all major endpoints in the TripSplit backend.

---

# 📌 1. AUTH APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login with email/password |
| GET | `/auth/logout` | Logout user |
| GET | `/auth/google` | Google OAuth login |
| GET | `/auth/facebook` | Facebook OAuth login |

---

## 🧪 Sample Requests & Responses

### **POST /auth/register**
**Request**
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Response**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "6903aa...",
    "name": "John Doe",
    "email": "john@gmail.com"
  }
}
```

---

### **POST /auth/login**

**Request**
```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Response**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "6903aa...",
    "name": "John Doe",
    "email": "john@gmail.com"
  }
}
```

---

# 👤 2. USER APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |

---

## 🧪 Sample Requests & Responses

### **GET /users/**
**Response**
```json
[
  { "_id": "69038b...", "name": "vinh", "email": "trivinh147@gmail.com" },
  { "_id": "690393...", "name": "Marcelo", "email": "marcelo@gmail.com" }
]
```

---

### **PUT /users/:id**

**Request**
```json
{
  "name": "New Name"
}
```

**Response**
```json
{
  "message": "User updated",
  "user": {
    "_id": "69038b...",
    "name": "New Name",
    "email": "trivinh147@gmail.com"
  }
}
```

---

# 👥 3. GROUP APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/groups/` | Get all groups |
| POST | `/groups/` | Create group |
| PUT | `/groups/:id/users` | Add user to group |
| PUT | `/groups/:id/expenses` | Add expense to group |
| DELETE | `/groups/:id/users` | Remove user |
| DELETE | `/groups/:id/expenses` | Remove expense |

---

## 🧪 Sample Requests & Responses

### **POST /groups/**
**Request**
```json
{
  "name": "DUDI Team Trip",
  "description": "Team building",
  "admin_id": "69038b29...",
  "user_ids": ["69038b29...", "6903934d..."]
}
```

**Response**
```json
{
  "message": "Group created",
  "group": {
    "_id": "69177b...",
    "name": "DUDI Team Trip",
    "admin_id": "69038b29...",
    "user_ids": ["69038b29...", "6903934d..."]
  }
}
```

---

### **PUT /groups/:id/users**

**Request**
```json
{
  "user_id": "6903934ec3..."
}
```

**Response**
```json
{
  "message": "User added to group",
  "group": { "...": "..." }
}
```

---

# 💸 4. EXPENSE APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/expenses/` | Create expense |
| PUT | `/expenses/:id` | Update expense |
| DELETE | `/expenses/:id` | Delete expense |

---

## 🧪 Sample Requests & Responses

### **POST /expenses/**
**Request**
```json
{
  "description": "Team Lunch Buffet",
  "amount": 480000,
  "paid_by": ["69038b29...", "6903934d..."],
  "paid_for": ["69038b29...", "6903934d...", "6903934e..."]
}
```

**Response**
```json
{
  "message": "Expense created",
  "expense": {
    "_id": "691779c0...",
    "amount": 480000
  }
}
```

---

# 🔢 5. CALCULATION APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/settlements/:groupId/balances` | Calculate all balances |
| GET | `/settlements/:groupId/split` | Calculate split amounts |
| POST | `/settlements/:groupId/settle-up` | Generate settlement transactions |

---

## 🧪 Sample Requests & Responses

### **GET /settlements/:groupId/balances**

**Response**
```json
[
  { "user_id": "...", "name": "vinh", "balance": 208333.33 },
  { "user_id": "...", "name": "Marcelo", "balance": -95833.33 }
]
```

---

### **GET /settlements/:groupId/split**

**Response**
```json
[
  {
        "from": {
            "id": "69039353c349550c006d1b3a",
            "name": "Zelma_Herzog74",
            "email": "Geraldine49@hotmail.com"
        },
        "to": {
            "id": "69038b292436a15e95bca74f",
            "name": "vinh",
            "email": "trivinh147@gmail.com"
        },
        "amount": 133333.3333333333
    },
    {
        "from": {
            "id": "6903934ec349550c006d1b2b",
            "name": "Darrell5",
            "email": "Karelle.Blick@gmail.com"
        },
        "to": {
            "id": "69038b292436a15e95bca74f",
            "name": "vinh",
            "email": "trivinh147@gmail.com"
        },
        "amount": 75000.00000000006
    },
]
```

---

### **POST /settlements/:groupId/settle-up**

**Response**
```json
[
  {
    "from": { "id": "6903934dc3...", "name": "Marcelo" },
    "to": { "id": "69038b2924...", "name": "vinh" },
    "amount": 95833.33
  },
  {
    "from": { "id": "6903934ec3...", "name": "Darrell" },
    "to": { "id": "69038b2924...", "name": "vinh" },
    "amount": 132500
  }
]
```

---

# 🔁 6. SPLIT APIs

## 📄 API Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/splits/:groupId` | Get splits in a group |
| POST | `/splits/:groupId/save` | Save generated settlement |
| DELETE | `/splits/:id` | Remove a split |

---

## 🧪 Sample Requests & Responses

### **POST /splits/:groupId/save**

**Request**
```json
{
  "settlements": [
    { "from": "id1", "to": "id2", "amount": 50000 },
    { "from": "id3", "to": "id2", "amount": 30000 }
  ]
}
```

**Response**
```json
{
  "message": "Settlement saved",
  "records_created": 3
}
```

---

# 📄 End of API Samples


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
