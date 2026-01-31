# PortfolYou - Developer Portfolio Platform

A comprehensive platform connecting developers, recruiters, and administrators. Developers can showcase their projects, recruiters can post jobs and discover talent, and admins manage the platform.

---

## ⚡ Super Quick Start (For the Impatient)

If you just want to run it NOW:

```bash
# 1. Make sure MongoDB is running on your system

# 2. Set up environment files (see detailed instructions below)

# 3. Install everything
npm install
cd server && npm install
cd ../client && npm install
cd ..

# 4. Run both server and client with one command
npm run dev

# 5. Open http://localhost:5173 in your browser
```

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)

### Installation Steps

#### 1. Clone or Extract the Project
```bash
# If using Git
git clone <repository-url>
cd portfolyou

# If you received a ZIP file, extract it and navigate to the folder
```

#### 2. Set Up Environment Variables

**For the Backend (Server):**

Create a file named `.env` in the `server` folder with the following content:

```env
PORT=3000
LOCAL_DB=mongodb://127.0.0.1:27017/PortfolYou
ATLAS_DB=mongodb://127.0.0.1:27017/PortfolYou
JWT_SECRET=your-super-secret-key-change-this-in-production
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**For the Frontend (Client):**

Create a file named `.env` in the `client` folder with:

```env
VITE_API_URL=http://localhost:3000
```

> **Note:** If you don't have Cloudinary credentials, image uploads won't work, but the rest of the platform will function normally.

#### 3. Install Dependencies

In the project root folder, run:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Go back to root
cd ..
```

#### 4. Start MongoDB

Make sure MongoDB is running on your computer:

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or run: mongod
```

**Mac:**
```bash
brew services start mongodb-community
# Or run: mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod
# Or run: mongod
```

#### 5. Start the Application

**🚀 Easy Method - One Command (Recommended):**

From the project root folder, run:
```bash
npm run dev
```

This will start both the server and client automatically! You should see:
- `[SERVER]` Server running on port 3000
- `[SERVER]` Connected to MongoDB
- `[CLIENT]` Local: http://localhost:5173/

**Alternative Method - Two Terminals:**

If you prefer to run them separately, open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

#### 6. Open the Application

Open your browser and go to:
```
http://localhost:5173
```

---

## 👥 User Types & Test Accounts

### Developer Account
- **Purpose:** Showcase projects, follow other developers, connect with recruiters
- **Features:** Create project cards, upload images, build portfolio

### Recruiter Account
- **Purpose:** Post job listings, discover developers, build company presence
- **Features:** Post jobs, manage company profile, follow developers

> **Creating Test Accounts:** You can register new accounts through the registration flow, or create an admin account through the database.

---

## 📋 How to Test the Platform

### 1. Registration Flow

**Register as a Developer:**
1. Click "Register" in the navigation
2. Click "I'm a Developer"
3. Fill in the form:
   - Name (first, middle, last)
   - Email & Password
   - Phone number
   - Location & City
   - Profession
   - Bio
   - Optional: Profile image URL
4. Click "Create Account"

**Register as a Recruiter:**
1. Click "Register" in the navigation
2. Click "I'm a Recruiter"
3. Fill in the form:
   - Personal information
   - Company information
   - Industry & company size
4. Click "Create Recruiter Account"

### 2. Login

1. Click "Login" in the navigation
2. Enter your email and password
3. Click "Login"

### 3. Developer Features

**Create a Project Card:**
1. Login as a developer
2. Go to "My Profile"
3. Click "Create New Project"
4. Fill in project details:
   - Title & Description
   - Tech stack
   - Project URL & GitHub URL
   - Optional: Image URL
5. Click "Create Project"

**Follow Other Developers:**
1. Browse users on the home page
2. Click on a user card to view their profile
3. Click "Follow" button

**View Your Network:**
1. Go to "My Profile"
2. See your followers and who you're following
3. Click on any user to view their profile

### 4. Recruiter Features

**Post a Job:**
1. Login as a recruiter
2. Click "Dashboard" in navigation
3. Click "Post New Job"
4. Fill in job details:
   - Title & Description
   - Requirements & Responsibilities
   - Tech stack
   - Location & Employment type
   - Salary range (optional)
   - Application URL
5. Click "Post Job"

**Manage Jobs:**
1. Go to "Dashboard"
2. View all your posted jobs
3. Edit or delete jobs using the buttons on each card

**Browse Developers:**
1. Go to "Home"
2. Browse developer profiles
3. Follow developers you're interested in

### 5. Browse Jobs

1. Click "Jobs" in the navigation
2. View all active job listings
3. Click on a job to see full details
4. Click "Apply" to go to the application page

### 6. Search & Filter

**Search:**
- Use the search bar at the top of the home page
- Search by name, profession, or keywords

**Filter:**
- Use the filter dropdown to filter by:
  - Profession
  - Location
- Toggle between "All Users" and "Following"

**View Modes:**
- Toggle between Card View and Table View using the buttons

---

### If images Not Uploading

If you don't have Cloudinary credentials:
1. You can still use the platform without images
2. Or sign up for a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
3. Add the credentials to your `.env` file

---

## 🛠️ Technology Stack

**Frontend:**
- React 19
- React Router
- Tailwind CSS
- React Hook Form
- Axios
- React Icons

**Backend:**
- Node.js
- Express 5
- MongoDB & Mongoose
- JWT Authentication
- Joi Validation
- Cloudinary (image hosting)
- Bcrypt (password hashing)

---

## 📄 License

This project was created as part of the HackerU Full Stack Development course.

---

## 👨‍💻 Developer

Created by Gur - HackerU Final Project 2026

---

**Happy Testing! 🚀**