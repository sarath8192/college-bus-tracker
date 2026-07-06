# College Bus Tracking System

A production-ready College Bus Tracking System built using React.js, Node.js, Express.js, Supabase, Render, and Vercel.

This project helps students, drivers, and college administrators manage transportation efficiently through live tracking, seat availability, trip management, route management, emergency alerts, and notifications.

## Live Project Links

Frontend Deployment: https://college-bus-tracker-2lss.vercel.app
Backend Deployment: https://college-bus-tracker-2.onrender.com
GitHub Repository: https://github.com/sarath8192/college-bus-tracker

## Project Overview

The College Bus Tracking System is a full-stack web application designed to solve real-world transportation problems faced by college students and administration.

Students can track buses, check seat availability, view notifications, and manage their profiles. Drivers can manage trips, update seat availability, report emergencies, and view trip history. Admins can manage students, drivers, buses, routes, notifications, and reports from a centralized dashboard.

## User Roles

### Student

* Register and login
* View student dashboard
* Track bus location
* Check seat availability
* View notifications
* Manage profile

### Driver

* Login as driver
* View driver dashboard
* Start and end trips
* Update seat availability
* Send emergency alerts
* View trip history

### Admin

* Login as admin
* View admin dashboard
* Manage students
* Manage drivers
* Manage buses
* Manage routes
* Send notifications
* View reports and analytics

## Features

* Role-based authentication
* Student, Driver, and Admin dashboards
* Bus route management
* Seat availability tracking
* Trip management
* Emergency alert system
* Notification system
* Reports module
* Responsive user interface
* Frontend deployed on Vercel
* Backend deployed on Render
* Supabase cloud database integration

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Supabase JavaScript Client

### Database

* Supabase PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Supabase

## Folder Structure

```text
college-bus-tracker/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── Routes/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── vercel.json
├── package.json
└── README.md
```

## Screenshots

Add screenshots here:

### Login Page

![Login Page](./screenshots/login.png)

### Student Dashboard

![Student Dashboard](./screenshots/student-dashboard.png)

### Driver Dashboard

![Driver Dashboard](./screenshots/driver-dashboard.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

### Seat Availability

![Seat Availability](./screenshots/seat-availability.png)

### Notifications

![Notifications](./screenshots/notifications.png)

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/sarath8192/college-bus-tracker.git
cd college-bus-tracker
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Create frontend `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run frontend

```bash
npm run dev
```

### 5. Install backend dependencies

```bash
cd backend
npm install
```

### 6. Create backend `.env` file

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```

### 7. Run backend

```bash
npm start
```

## Deployment

### Frontend

The frontend is deployed on Vercel.

### Backend

The backend is deployed on Render.

### Database

Supabase is used as the cloud database.

## Future Improvements

* Real GPS live tracking using driver mobile location
* Push notifications
* Advanced admin analytics
* Email alerts
* Mobile application version
* Payment/pass management system
* Driver attendance tracking

## Author

Sarath Chandra
GitHub: https://github.com/sarath8192


## Docker Images

This project is containerized using Docker. The frontend and backend images are available on Docker Hub.

### Backend Docker Image

Pull backend image:

```bash
docker pull sarath1236/college-bus-backend:v1
