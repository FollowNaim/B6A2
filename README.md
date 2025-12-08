# GearShift - 🚗 A Vehicle Rental System

A backend API for managing a vehicle rental system with full support for vehicles, users, bookings, and authentication with role-based access control.

**Live URL:** _[GearShift](https://gearshift-server.vercel.app/)_

**Default Users**

- Admin

```bash
admin@gmail.com
admin123
```

- Customer

```bash
customer@gmail.com
customer123
```

---

## 🎯 Features

- Vehicles Management: Add, view, update, delete vehicles with availability tracking
- Customer Management: Manage user accounts and profiles
- Bookings: Create, cancel, return bookings with automatic price calculation
- Authentication & Authorization: Admin & Customer roles, bcrypt password hashing, JWT authentication
- Role-based Access Control: Admin has full access, Customer can manage own profile and bookings

---

## 🛠️ Technology Stack

- Node.js, TypeScript, Express.js
- PostgreSQL
- JWT (jsonwebtoken), bcrypt
- pnpm, ts-node

---

## 🌐 API Endpoints

### Authentication

- POST `/api/v1/auth/signup`
- POST `/api/v1/auth/signin`

### Vehicles

- POST `/api/v1/vehicles`
- GET `/api/v1/vehicles`
- GET `/api/v1/vehicles/:vehicleId`
- PUT `/api/v1/vehicles/:vehicleId`
- DELETE `/api/v1/vehicles/:vehicleId`

### Users

- GET `/api/v1/users`
- PUT `/api/v1/users/:userId`
- DELETE `/api/v1/users/:userId`

### Bookings

- POST `/api/v1/bookings`
- GET `/api/v1/bookings`
- PUT `/api/v1/bookings/:bookingId`

---

## ⚡ Setup & Deployment

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/B6A2.git
cd B6A2
```

2. **Install Dependencies**

```bash
pnpm install
```

3. **Create a .env file in the project root with following the config file**
4. **Start Development Server**

```bash
pnpm dev
```

5. **Build in the production**

```bash
pnpm build
```

6. **Open your browser or API client and use:**

```bash
http://localhost:5000/api/v1/
```

---

## 🔒 Notes

- All protected endpoints require `Authorization: Bearer <jwt_token>`

---

Made with ❤️ by **Naim**
