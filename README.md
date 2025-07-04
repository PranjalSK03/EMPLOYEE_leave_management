# EMPLOYEE_leave_management

# Aphelion: Leave Management System for Employees

Aphelion is a modern, web-based Leave Management System designed to streamline and automate the leave application and approval process within organizations. Built using the MERN stack and enhanced with Tailwind CSS, it offers a secure, efficient, and user-friendly experience for both employees and administrators.

## 🚀 Features

- 🔐 Secure authentication using JWT and password hashing with bcrypt
- 📋 Role-based access control for employees, managers, HR, and CEO
- 📈 Real-time leave status tracking and notifications
- 📊 Comprehensive reporting and analytics
- 🌐 Fully web-based and mobile-compatible interface
- 📁 Comment threads on leave applications
- 🧾 Accurate leave balance and payroll integration
- 🧠 Intelligent leave flow routing and timestamp logging

## 🧱 Tech Stack

**Frontend**:
- React.js
- Tailwind CSS
- HTML5, CSS3

**Backend**:
- Node.js
- Express.js

**Database**:
- MongoDB
- Mongoose ODM

**Authentication & Security**:
- JWT (JSON Web Tokens)
- bcrypt
- HTTPS

## 🏗️ Architecture

Aphelion follows an MVC architecture:
- **Model**: Mongoose-based schemas for employees, applications, flows, and on-leave data.
- **View**: Built using React and Tailwind for responsive and intuitive UI.
- **Controller**: Express.js handles business logic and routes.

RESTful APIs enable efficient communication between the frontend and backend.

## 📚 Modules & Roles

Each user role has custom access and features:

- **Technical Staff**: Apply for leave, view status, leave history.
- **Assistant Technical Head**: Approve/reject leaves of staff, view department leave status.
- **Head Technical**: Manage staff, applications, and reports.
- **HR Staff**: Similar to technical roles but for HR department.
- **Head HR & Assistant HR Head**: Full leave oversight, employee management.
- **CEO**: Org-wide approval and employee oversight.

## 📦 System Requirements

- Compatible with Chrome, Firefox, Edge, Safari
- Runs on Windows, macOS, Linux
- No internet connection required, Runs as localhost

## 📂 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/aphelion-leave-management.git
cd aphelion-leave-management

# Install backend dependencies
cd backend
npm install

# Setup environment variables
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret

# Start backend
npm start

# In a new terminal, install frontend dependencies
cd ../frontend
npm install

# Start frontend
npm run dev

