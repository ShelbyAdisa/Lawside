#  Law Firm Booking System

A full-stack web application that enables clients to book appointments with lawyers, make secure payments, and manage legal interactions. Built with Django (REST API) and React (frontend), with Stripe integration for payments and role-based dashboards for different users (Client, Lawyer, Admin).

---

## 🔧 Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Stripe.js
- Lucide Icons

### Backend
- Django
- Django REST Framework
- dj-rest-auth
- Custom User Model (Email-only login)
- Stripe API

### Database
- SQLite (dev) / PostgreSQL (prod)

---

##  Features

###  Authentication
- Email-only login and registration
- Role-based sign-up (Client or Lawyer)
- JWT-based authentication
- Protected frontend routes

###  User Roles
- **Client**
  - Book appointments with lawyers
  - Upload documents
  - View booking status (pending/confirmed)
- **Lawyer**
  - Set availability
  - Accept/decline appointments
  - Profile with description, practice areas, and profile image
- **Admin**
  - Manage users and appointments (optional)

###  Payments
- Stripe Checkout integration
- Clients can pay for appointments securely
- Webhooks to verify payment success

###  Appointments
- Date & time picker for bookings
- Real-time status updates (Pending → Confirmed)
- Dashboard views for upcoming and past appointments

---



