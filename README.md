# College Bus Tracking System

A full-stack College Bus Tracking System built using the MERN stack and extended with DevOps, Cloud, Docker, Terraform, CI/CD, Security, Monitoring, Performance Optimization, and Kubernetes basics.

## Project Overview

The College Bus Tracking System is designed to help students, drivers, and administrators manage and track college bus operations digitally.

The system provides features such as student login, driver management, bus management, live tracking support, seat availability, route management, notifications, admin dashboard, and backend APIs.

This project was also enhanced with real-world DevOps and Cloud practices to make it deployment-ready and resume-ready.

## Key Features

### Student Features

- Student registration and login
- View assigned bus details
- View route and stops
- Check seat availability
- View notifications
- Access student profile

### Driver Features

- Driver login
- View assigned trip
- Update trip status
- Manage seat updates
- Emergency alert support
- View trip history

### Admin Features

- Admin dashboard
- Manage students
- Manage drivers
- Manage buses
- Manage routes
- Manage trips
- Manage notifications

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Redux Toolkit
- Axios
- Leaflet
- Material UI
- React Toastify

### Backend

- Node.js
- Express.js
- Supabase
- JWT Authentication
- REST APIs

### DevOps and Cloud

- Git and GitHub
- GitHub Actions
- Docker
- Docker Compose
- Docker Hub
- Terraform
- AWS EC2
- Kubernetes
- ESLint
- Prettier
- Security scanning
- Logging and monitoring

## Project Structure

```txt
college-bus-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── Routes/
│   ├── assets/
│   └── main.jsx
│
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── DEVOPS_PHASES.md
│   ├── KUBERNETES.md
│   ├── PERFORMANCE.md
│   ├── SCREENSHOTS.md
│   └── SETUP.md
│
├── k8s/
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
│
├── terraform/
├── .github/workflows/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
└── README.md