# VendorHub — Vendor Booking Dashboard

A full-stack vendor booking management system built with **Node.js**, **Express.js**, **MySQL**, and **Vanilla JavaScript**. This project allows users to manage event vendors and track booking inquiries through a clean, responsive dashboard.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL with Sequelize ORM |
| Authentication | JWT (JSON Web Tokens) |
| Architecture | MVC (Model-View-Controller) |

---

## ✨ Features

- **JWT Authentication** — Secure login/register with token-based auth
- **Vendor Management** — Add, edit, delete, search and filter vendors by category
- **Inquiry Management** — Track event inquiries with status (Pending / Approved / Rejected)
- **Dashboard Analytics** — Live stats for total vendors, inquiries, and status counts
- **Search & Filter** — Real-time search on vendors and inquiries
- **Responsive Design** — Works on desktop and mobile
- **Protected Routes** — Dashboard accessible only after login

---

## 📁 Project Structure

```
vendor-booking/
├── backend/
│   ├── config/
│   │   └── database.js          # Sequelize + MySQL connection
│   ├── controllers/
│   │   ├── authController.js    # Register & Login logic
│   │   ├── vendorController.js  # Vendor CRUD operations
│   │   └── inquiryController.js # Inquiry CRUD + dashboard stats
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Vendor.js            # Vendor model
│   │   └── Inquiry.js           # Inquiry model (FK → Vendor)
│   ├── routes/
│   │   ├── auth.js              # /api/auth routes
│   │   ├── vendors.js           # /api/vendors routes
│   │   └── inquiries.js         # /api/inquiries routes
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env.example             # Environment variable template
└── frontend/
    ├── css/
    │   └── style.css            # All styles (responsive)
    ├── js/
    │   ├── api.js               # Fetch wrapper + token helpers
    │   ├── app.js               # Page routing + sidebar logic
    │   ├── auth.js              # Login/Register form handlers
    │   ├── dashboard.js         # Stats + recent inquiries
    │   ├── vendors.js           # Vendor CRUD + search
    │   └── inquiries.js         # Inquiry CRUD + search
    ├── login.html               # Auth page (standalone)
    └── dashboard.html           # Main app (protected)
```

---

## ⚙️ Setup & Installation

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MySQL](https://dev.mysql.com/downloads/installer/) (v8 or above)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vendor-booking.git
cd vendor-booking
```

### 2. Create MySQL database

Open MySQL Workbench or terminal and run:

```sql
CREATE DATABASE vendor_booking;
```

### 3. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Open `.env` and update your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vendor_booking
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 4. Install dependencies & start server

```bash
npm install
npm start
```

### 5. Open in browser

```
http://localhost:5000
```

Sequelize will automatically create all tables on first run. Register a new account and you're good to go.

---

## 🔌 REST API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

### Vendors *(JWT required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors` | Get all vendors (supports `?search=` & `?category=`) |
| GET | `/api/vendors/:id` | Get single vendor |
| POST | `/api/vendors` | Create vendor |
| PUT | `/api/vendors/:id` | Update vendor |
| DELETE | `/api/vendors/:id` | Delete vendor |

### Inquiries *(JWT required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inquiries` | Get all inquiries (supports `?search=` & `?status=`) |
| GET | `/api/inquiries/stats` | Get dashboard stats |
| GET | `/api/inquiries/:id` | Get single inquiry |
| POST | `/api/inquiries` | Create inquiry |
| PUT | `/api/inquiries/:id` | Update inquiry |
| DELETE | `/api/inquiries/:id` | Delete inquiry |

---

## 📊 Database Models

**User** — `id`, `name`, `email`, `password` (bcrypt hashed)

**Vendor** — `id`, `name`, `email`, `phone`, `category`, `address`

**Inquiry** — `id`, `eventName`, `customerName`, `eventDate`, `vendorId` (FK), `budget`, `status`

---

## 🖥️ Screenshots

| Page | Description |
|---|---|
| Login / Register | Clean auth page, no sidebar visible |
| Dashboard | Stats cards + recent inquiries table |
| Vendors | Full CRUD with search & category filter |
| Inquiries | Full CRUD with search & status filter |

---

## 🔐 How Authentication Works

1. User registers → password hashed with **bcrypt** → saved to DB
2. User logs in → JWT token generated → stored in **localStorage**
3. Every API request sends `Authorization: Bearer <token>` header
4. Backend middleware verifies token before allowing access
5. On logout → token cleared → redirect to login page

---

## 👨‍💻 Author

Built by **[Your Name]**  
📧 your.email@example.com  
🔗 [LinkedIn](https://linkedin.com/in/yourprofile) | [GitHub](https://github.com/your-username)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
