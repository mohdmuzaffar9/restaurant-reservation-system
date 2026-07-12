# 🍽️ Restaurant Reservation Management System

A full-stack **Restaurant Reservation Management System** built using the **MERN Stack** with **JWT Authentication**, **Role-Based Access Control**, and **Smart Reservation Management**.

This project allows customers to book restaurant tables while providing administrators with a complete dashboard to manage reservations efficiently.

> Developed as part of a Full Stack Internship Assignment.

---

# Live Demo 

### 🚀 Frontend (Vercel)

**Live Website:**

https://restaurant-reservation-system-mxwl373xl-mohammed-muzaffar.vercel.app/

---

Frontend:
Coming Soon

Backend API:
Coming Soon

# 🌟 Project Highlights

- 🔐 JWT Authentication & Authorization
- 👤 Customer & Admin Roles
- 🍽️ Table Reservation System
- 📅 Date-based Reservation Filtering
- 🚫 Double Booking Prevention
- ⏱️ Reservation Validation Rules
- ❌ Reservation Cancellation
- ✅ Reservation Completion
- 📱 Fully Responsive UI
- ⚡ REST API Architecture
- 🍃 MongoDB Database
- 🎨 Modern Tailwind CSS UI

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📂 Project Structure

```
restaurant-reservation-system
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   └── public
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── validations
│
└── README.md
```

---

# ✨ Features

## Customer

- User Registration
- User Login
- JWT Authentication
- Book Restaurant Table
- View My Reservations
- Cancel Reservation
- Responsive Customer Dashboard

---

## Admin

- Secure Admin Login
- Dashboard Statistics
- View All Reservations
- Filter Reservations by Date
- Mark Reservation as Completed
- Cancel Any Reservation
- Responsive Admin Dashboard

---

# 👨‍💼 Demo Credentials

## 🔐 Admin Login

Use the following credentials to access the **Admin Dashboard**.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | **ADMIN_EMAIL=admin@restaurant.com** |                      **ADMIN_PASSWORD=Admin@123** |

> **Note:** The Admin account is automatically created using the seed script. Use the above credentials to log in as an administrator.

## 👤 Customer Login

Customers do **not** have predefined credentials.

To access the customer features:

1. Register a new account using the **Register** page.
2. Log in using the registered email and password.
3. Start booking and managing reservations.
---

# ⚙️ Setup Instructions

## Clone Repository

```bash
git clone https://github.com/mohdmuzaffar9/restaurant-reservation-system.git
```

```bash
cd restaurant-reservation-system
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create

```
.env
```

Add

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

Run backend

```bash
npm run dev
```

---

### Database Seed

Run the database seed

```bash
npm run seed
```

This command creates the default administrator account required for accessing the Admin Dashboard.

## Frontend Setup

Open another terminal

```bash
cd client
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

---

# 🌐 Environment Variables

Backend

```
PORT

MONGO_URI

JWT_SECRET
```

Frontend

```
VITE_API_URL
```

(if deployed)

---

# 🧠 Reservation & Availability Logic

The reservation system follows several business rules to ensure fair and accurate table allocation.

### Reservation Rules

- Restaurant operates from **11:00 AM to 11:00 PM**
- Reservation slots are available every **30 minutes**
- Each reservation occupies a table for **90 minutes**
- Minimum advance booking time is **30 minutes**
- Maximum guests allowed per reservation is **8**
- Minimum guests required is **1**

### Validation

The system validates:

- Reservation date cannot be in the past.
- Reservation time must be within restaurant working hours.
- Same-day reservations must satisfy minimum advance booking.
- Guest count must be between 1 and 8.
- Invalid dates are rejected.

### Availability Logic

When a reservation request is received:

1. Reservation date and time are validated.
2. Guest count is validated.
3. Available restaurant tables are searched.
4. Tables already occupied during the requested slot are excluded.
5. Suitable table is automatically assigned.
6. Reservation is saved with **Confirmed** status.

This prevents overlapping reservations and double bookings.

---

# 🔐 Role-Based Access Control

## Customer

Customers can:

- Register
- Login
- Book Table
- View Their Own Reservations
- Cancel Their Own Reservations

Customers cannot:

- Access Admin Dashboard
- View Other Customer Reservations
- Update Reservation Status

---

## Admin

Administrators can:

- Login
- Access Admin Dashboard
- View All Reservations
- Filter Reservations by Date
- Mark Reservations as Completed
- Cancel Any Reservation

Administrators cannot:

- Access customer-only pages.

---

# 📌 Assumptions Made

The following assumptions were made while developing this project:

- Restaurant operates daily from **11:00 AM to 11:00 PM**.
- Reservation slots are available every **30 minutes**.
- Dining duration for every reservation is **90 minutes**.
- Maximum guests per reservation is **8**.
- One reservation is assigned to one suitable table.
- A pre-created Admin account is available for testing.
- Customers create their own accounts through registration.

---

# ⚠️ Known Limitations

Current version does not include:

- Email Notifications
- SMS Notifications
- Online Payment Integration
- Multi-Branch Restaurant Support
- Analytics Dashboard
- Customer Reviews
- Real-time Notifications

These features can be implemented in future versions.

---

# 🚀 Future Improvements

Given additional development time, the following enhancements can be added:

- Restaurant Table Management
- QR Code Check-in
- Waitlist Management
- Email Confirmation
- SMS Reminder
- Payment Gateway
- AI-based Table Suggestions
- Multi-Restaurant Support
- Reservation Analytics
- Customer Feedback & Ratings

---

# 📸 Screenshots

> Screenshots will be added soon.

Suggested screenshots:

- Home Page
- Login
- Register
- Customer Dashboard
- Book Table
- My Reservations
- Admin Dashboard
- Responsive Mobile View

# 📈 API Features

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- RESTful API Design
- Error Handling Middleware
- Request Validation
- Secure Password Hashing
- MongoDB Transactions Ready

---

# 👨‍💻 Author

**Mohammed Muzaffar**

GitHub:
https://github.com/mohdmuzaffar9/mohdmuzaffar9.git

LinkedIn:
https://www.linkedin.com/in/mohammed-muzaffar-3b61572a4

---

## 🔐 Admin Login

Use the following credentials to access the **Admin Dashboard**.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | **ADMIN_EMAIL=admin@restaurant.com** |                      **ADMIN_PASSWORD=Admin@123** |

> **Note:** The Admin account is automatically created using the seed script. Use the above credentials to log in as an administrator.

# 📄 License

This project was developed as part of a Full Stack Internship Assignment and is intended for educational and evaluation purposes only.