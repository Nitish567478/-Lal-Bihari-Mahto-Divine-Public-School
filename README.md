# 🏫 Lal Bihari Mahto Divine Public School (LBMDPS)
### Enterprise School Management System & Multi-Role ERP Portal

[![CBSE Affiliated](https://img.shields.io/badge/CBSE_Affiliation-%233430398-blue.svg?style=flat-square)](https://cbse.gov.in)
[![UDISE Code](https://img.shields.io/badge/UDISE_Code-20060105502-success.svg?style=flat-square)](https://udiseplus.gov.in)
[![School Code](https://img.shields.io/badge/School_Code-08123%20%7C%2066258-indigo.svg?style=flat-square)](#)
[![Session](https://img.shields.io/badge/Session-2026--2027-orange.svg?style=flat-square)](#)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Mongoose-47A248.svg?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Vercel Deployment](https://img.shields.io/badge/Hosting-Vercel_Ready-black.svg?style=flat-square&logo=vercel)](https://vercel.com)
[![Backend Render](https://img.shields.io/badge/Backend_Live-Render-46E3B7.svg?style=flat-square&logo=render)](https://lal-bihari-mahto-divine-public-school-1.onrender.com)
[![License](https://img.shields.io/badge/License-Institutional_CBSE-lightgrey.svg?style=flat-square)](#)

---

## 📑 Table of Contents

1. [Institutional Profile & Accreditation](#-institutional-profile--accreditation)
2. [Instant One-Click Demo Credentials](#-instant-one-click-demo-credentials)
3. [Portal Architecture & Core Modules](#-portal-architecture--core-modules)
   - [Parent Ward Portal (12 Wings)](#1-parent-ward-portal-parentdashboard---12-wings)
   - [Public Website & Admissions](#2-public-website--online-admissions-desk)
   - [24/7 AI Admissions Assistant](#3-247-ai-admissions-assistant-powered-by-google-gemini)
   - [Student Academic Portal](#4-student-academic-portal-studentdashboard)
   - [Teacher Academic Portal](#5-teacher-academic-portal-teacherdashboard)
   - [Accountant & Fee Desk](#6-accountant--fee-desk-accountantdashboard)
   - [Super Admin Master Console](#7-super-admin-master-console-admindashboard)
4. [CBSE Fee Structure (Session 2026–2027)](#-cbSE-fee-structure-session-20262027)
5. [Transport Fleet & Bus Routes](#-transport-fleet--bus-routes)
6. [Complete Project Directory Tree](#-complete-project-directory-tree)
7. [Tech Stack & Architecture](#-tech-stack--architecture)
8. [Backend REST API Endpoints](#-backend-rest-api-endpoints)
9. [Environment Configuration](#-environment-configuration)
10. [Local Development & Quick Start](#-local-development--quick-start)
11. [Vercel Public Deployment Guide](#-vercel-public-deployment-guide)
12. [Keyboard Shortcuts & Power Features](#-keyboard-shortcuts--power-features)
13. [CBSE & NEP 2020 Compliance](#-cbse--nep-2020-compliance)
14. [License & Institutional Credits](#-license--institutional-credits)

---

## 🏛️ Institutional Profile & Accreditation

**Lal Bihari Mahto Divine Public School (LBMDPS)** is an English-medium co-educational institution affiliated with the **Central Board of Secondary Education (CBSE), New Delhi**, catering to students from Pre-Nursery through Class 10. Founded in 2013, the campus is equipped with smart classrooms, advanced computer and composite science laboratories, extensive sports grounds, and a GPS-tracked bus fleet.

| Institution Parameter | Official Accredited Details |
| :--- | :--- |
| **School Name** | Lal Bihari Mahto Divine Public School (LBMDPS) |
| **CBSE Affiliation No.** | **`3430398`** (Secondary Level, New Delhi) |
| **UDISE Code** | **`20060105502`** (Ministry of Education, Govt. of India) |
| **School Code** | **`08123`** / **`66258`** |
| **Year of Establishment** | 2013 |
| **Campus Address** | Village Naitand, Post Jamua / Bandiyabad, District Giridih, Jharkhand – 815318 |
| **Admissions & ERP Helpline** | **`+91 9162789001`** |
| **Institutional Motto** | *"Vidya Dadati Vinayam"* (विद्या ददाति विनयं — Knowledge Bestows Humility) |
| **Curriculum Framework** | Central Board of Secondary Education (CBSE) & NEP 2020 |

---

## 🔑 Instant One-Click Demo Credentials

To test any user role, visit the Unified Portal Gateway at [`/login`](http://localhost:3000/login). You can click any role tab or use the **"Auto-fill Demo"** button:

| Role | Username / ID | Password | Portal Route | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| 👑 **Super Admin** | `superadmin` | `super123` | `/admin/dashboard` | Master DB control, staff provisioning, system auditing |
| 🛡️ **Admin** | `admin` | `admin123` | `/admin/dashboard` | Student enrollments, notices, gallery CMS, CRM leads |
| 💰 **Accountant** | `accountant` | `acc123` | `/accountant/dashboard` | Fee ledger, voucher dues, printable CBSE receipts |
| 📚 **Teacher** | `teacher` | `teach123` | `/teacher/dashboard` | Daily attendance, marksheet entry, homework diary |
| 🎓 **Student** | `student` | `student123` | `/student/dashboard` | Schedule, homework list, report cards, digital ID |
| 👨‍👩‍👧 **Parent** | `parent` | `parent123` | `/parent/dashboard` | Multi-child switcher, 12 wings, fee dues, bus GPS |

> **Pro Tip**: Press `Alt + L` from anywhere on the public website to instantly trigger the Staff Login Gateway.

---

## 🚀 Portal Architecture & Core Modules

### 1. Parent Ward Portal (`/parent/dashboard`) — 12 Wings

The Parent Dashboard is categorized into 3 distinct functional wings with real-time multi-child switching between wards (e.g. *Aarav Kumar* – Class 10A and *Ananya Kumar* – Class 6B):

#### 🎓 Academic Wing
1. **📊 Ward Overview (`overview`)**: Real-time snapshot of academic GPA, attendance percentage, active homework count, and recent teacher remarks.
2. **📅 Daily Attendance (`attendance`)**: Detailed attendance ledger showing 94.8% streak, monthly calendar breakdown, and an online **Student Leave Application** form with instant submission.
3. **📈 Academic Progress & CCE (`academics`)**: Term 1 CCE scorecards, scholastic performance grades (A1/A2), co-scholastic metrics, and mentor feedback.
4. **📖 Homework & Class Diary (`homework`)**: Subject-wise daily assignments, submission due dates, and an interactive **"Verified by Parent"** checklist.
5. **🕒 Weekly Timetable (`timetable`)**: Interactive 6-day (Monday to Saturday) period schedule with period numbers, timings, subjects, faculty names, and room numbers.
6. **📝 Exam Schedule & Datesheet (`exams`)**: Official examination datesheet displaying CBSE Subject Codes (`041` Math, `086` Science, `087` Social Science, `101` English, `002` Hindi, `165` Computer), exam timings, and syllabus topics.

#### 💳 Finance & Transport Wing
7. **💰 Fee Ledger & Dues (`fees`)**: Itemized quarterly fee vouchers, due date tracking, payment status pills (`Paid` / `Due`), and instant online payment action with printable receipts.
8. **🚌 Bus & Transport Desk (`transport`)**: Route #4 live GPS tracking, vehicle #JH-11-AB-4021 status, direct driver call (Sri Ramdhari Yadav) & conductor call, and morning/afternoon timing stop table.

#### 📢 Communication & ID Wing
9. **💬 Teacher Messages (`messaging`)**: Direct bidirectional messaging thread with Class Teacher Smt. Priyanka Sharma and subject faculties.
10. **📋 Notices & Circulars (`notices`)**: School circulars, holiday announcements, and digital permission slips with an interactive parent consent toggle.
11. **🏆 Events & Calendar (`events`)**: Annual sports meet, science fair, Olympiad dates, and Parent-Teacher Meeting (PTM) alerts.
12. **🪪 Student Profile & Digital ID (`profile`)**: Official CBSE digital student identity card with school crest, Affiliation #3430398, UDISE: 20060105502, blood group, emergency contacts, and pediatric wellness logs.

---

### 2. Public Website & Online Admissions Desk
- **Hero Campus Showcase**: Interactive campus photography slider with enrollment CTAs.
- **Online Admission Form**: Multi-step registration capturing student particulars, guardian contacts, Aadhaar, DOB, and target class.
- **Academic Wings Exploration**: Curricular overviews for Pre-Primary, Primary, Middle, and Secondary Wings.
- **Campus Facilities**: Smart Classrooms, Computer Lab, Science Labs, Library, Hostel, Transportation, and 24x7 CCTV Security.

---

### 3. 24/7 AI Admissions Assistant (Powered by Google Gemini)
- Floating circular launcher button with school crest and dynamic violet-magenta halo pulse.
- Connects directly to Google Gemini Interactions API (`gemini-2.0-flash` / `gemini-1.5-flash`) for natural conversational counseling regarding:
  - Admission guidelines, age cutoffs, and session 2026–27 deadlines.
  - CBSE fee structures, installment dates, and transport fees.
  - Bus routes and pick-up stops across Giridih district.
- **Automatic Heuristic Fallback**: If the Gemini API is offline or without network access, an intelligent local rule-based engine answers inquiries instantly without interruption.
- **Built-in Admissions CRM Lead Capture**: Automatically captures parent callback inquiries into the administrative CRM ledger.

---

### 4. Student Academic Portal (`/student/dashboard`)
- Personalized greeting with live institutional clock.
- Printable weekly class timetable with dedicated printable window styling.
- Homework assignment tracker with submission statuses.
- Cumulative performance report cards with official CBSE affiliation badges.
- Downloadable / printable Student Identity Card.

---

### 5. Teacher Academic Portal (`/teacher/dashboard`)
- Attendance registrar with single-click bulk marking (`Present`, `Absent`, `Late`).
- Term examination marks entry with automatic grade calculation according to CBSE 9-point scale.
- Daily homework and class diary publishing.
- Printable official CBSE student assessment reports.

---

### 6. Accountant & Fee Desk (`/accountant/dashboard`)
- Real-time fee collection dashboard with revenue breakdown by class and quarter.
- Generation and tracking of quarterly installment fee vouchers.
- Official printable CBSE Fee Receipts complete with school credentials, affiliation, UDISE code, receipt number, and payment mode.

---

### 7. Super Admin Master Console (`/admin/dashboard`)
- Master executive banner displaying CBSE Affiliation #3430398 & UDISE: 20060105502.
- Student & staff record management.
- Admissions CRM lead processing and callback tracking.
- Notice board publisher and gallery photo CMS.

---

## 💰 CBSE Fee Structure (Session 2026–2027)

Approved transparent fee schedule for Academic Session 2026–2027:

| Academic Wing | Classes Enrolled | One-Time Admission Fee | Monthly Tuition Fee | Quarterly Composite Fee |
| :--- | :--- | :---: | :---: | :---: |
| **Pre-Primary Wing** | Nursery, LKG, UKG | ₹2,500 | ₹1,050 | ₹3,150 |
| **Primary Wing** | Class 1 to Class 5 | ₹3,000 | ₹1,250 | ₹3,750 |
| **Middle Wing** | Class 6 to Class 8 | ₹3,500 | ₹1,450 | ₹4,350 |
| **Secondary Wing** | Class 9 & Class 10 | ₹4,000 | ₹1,650 | ₹4,950 |

* **Bus Transport (Optional)**: Uniform nominal fee of **₹500 / month** across all 8 verified school routes.
* **Payment Due Dates**: 10th of every quarter month (April, July, October, January).

---

## 🚌 Transport Fleet & Bus Routes

The school operates an active fleet of modern, speed-governed, GPS-enabled buses covering the entire Giridih region:

| Route # | Key Boarding / Drop Points | Vehicle Reg. No. | Driver Details | Conductor | Morning Pickup |
| :---: | :--- | :---: | :--- | :--- | :---: |
| **Route 1** | Giridih Town, Bus Stand, Court | JH-11-AB-1020 | Sri Umesh Verma | Sri Bablu Rai | 07:05 AM |
| **Route 2** | Pachamba, Beniadih, Sihodih | JH-11-AB-2035 | Sri Rajesh Tudu | Sri Dinesh Saw | 07:15 AM |
| **Route 3** | Jamua Bazar, Mirzaganj Road | JH-11-AB-3042 | Sri Ramesh Yadav | Sri Sitaram Mahto | 07:10 AM |
| **Route 4** | **Naitand, Bandiyabad, Pandedih** | **JH-11-AB-4021** | **Sri Ramdhari Yadav** | **Sri Manoj Kumar** | **07:25 AM** |
| **Route 5** | Rajdhanwar, Khorimahua | JH-11-AB-5011 | Sri Sunil Soren | Sri Ashok Pandit | 07:00 AM |
| **Route 6** | Bengabad, Madhupur Link Road | JH-11-AB-6088 | Sri Mukesh Mondal | Sri Gopal Yadav | 07:08 AM |
| **Route 7** | Baddiha, Chhatabad, Matrukha | JH-11-AB-7094 | Sri Manoj Singh | Sri Suresh Das | 07:20 AM |
| **Route 8** | Tisri Link & Deori Junction | JH-11-AB-8015 | Sri Binod Prasad | Sri Kaleshwar Murmu | 06:55 AM |

---

## 📂 Complete Project Directory Tree

```
My School/
├── client/                               # React 18 Frontend Application
│   ├── public/                           # Static assets, HTML shell, and manifest
│   │   ├── index.html                    # Root HTML document with CBSE metadata
│   │   ├── favicon.ico                   # School crest favicon
│   │   └── manifest.json                 # PWA Web manifest
│   ├── src/
│   │   ├── components/                   # Reusable UI Components
│   │   │   ├── AIAssistant/              # 24/7 Admissions AI Chatbot & Heuristic Engine
│   │   │   ├── AllImage/                 # School logos, campus photos, faculty assets
│   │   │   ├── Footer/                   # Official footer with CBSE & UDISE credentials
│   │   │   ├── Header/                   # Navigation bar with dropdowns & enrollment CTA
│   │   │   ├── WelcomePopup/             # Admission 2026-27 entrance modal
│   │   │   └── WhatsAppWidget/           # Quick WhatsApp admission connect
│   │   ├── pages/                        # Role Dashboards and Website Subpages
│   │   │   ├── About/                    # Institutional history and leadership
│   │   │   ├── Academic/                 # Curriculum, pedagogy, and CBSE milestones
│   │   │   ├── AccountantDashboard/      # Fees collection, vouchers, payment receipts
│   │   │   ├── AdminDashboard/           # Super Admin and Admin Management Console
│   │   │   ├── Home/                     # Main campus homepage
│   │   │   ├── Login/                    # Split 2-column Unified Portal Gateway
│   │   │   ├── NotFound/                 # 404 page with campus backdrop & quick navigation
│   │   │   ├── ParentDashboard/          # Redesigned 12-wing Parent Ward Portal
│   │   │   ├── PrivacyPolicy/            # Student data protection policy
│   │   │   ├── StudentDashboard/         # Student academic schedule and scorecard
│   │   │   ├── TeacherDashboard/         # Teacher attendance, marks, and homework desk
│   │   │   └── TermsOfService/           # Legal terms of website and ERP usage
│   │   ├── utils/
│   │   │   └── api.js                    # Axios client, auth interceptors, and fallback mock DB
│   │   ├── App.js                        # Client-side router configuration
│   │   ├── App.css                       # Global themes and utility styles
│   │   ├── index.js                      # React DOM root entrypoint
│   │   └── vercel.json                   # Client SPA routing rewrite rules for Vercel
│   ├── package.json                      # Frontend dependencies and test scripts
│   └── .gitignore                        # Client git ignore rules
│
├── server/                               # Node.js / Express Backend API
│   ├── controllers/                      # Request handlers (admin, application, content)
│   ├── data/
│   │   └── local-store.json              # Persistent mock database fallback
│   ├── models/                           # Mongoose data schemas (Admin, Application, Content)
│   ├── routes/                           # API Route Handlers
│   │   ├── adminRoutes.js                # Administrator authentication and records
│   │   ├── aiChatRoutes.js               # Gemini AI chat endpoint and lead sync
│   │   ├── attendanceRoutes.js           # Student attendance ledger routes
│   │   ├── crmRoutes.js                  # Admissions CRM lead management
│   │   ├── feeRoutes.js                  # Fee vouchers, ledger, and payment tracking
│   │   ├── portalRoutes.js               # Multi-role authentication & session sync
│   │   └── staffProvisionRoutes.js       # Faculty and staff allocation
│   ├── services/
│   │   └── notificationService.js        # SMS & email dispatch simulations
│   ├── utils/
│   │   └── fileStore.js                  # Local JSON store persistence manager
│   ├── index.js                          # Express server entrypoint (Port 5000)
│   ├── package.json                      # Server dependencies
│   ├── .env                              # Active environment variables
│   └── .env.example                      # Sample server environment configuration
│
├── package.json                          # Root package configuration with concurrent dev runner
├── vercel.json                           # Root Vercel deployment configuration
├── .gitignore                            # Root git ignore specification
└── README.md                             # Comprehensive institutional documentation
```

---

## 💻 Tech Stack & Architecture

- **Frontend Core**: React 18, React Router DOM (v5), ES6+ JavaScript.
- **Styling Architecture**: Custom CSS Variables, Glassmorphic UI, responsive Flexbox and CSS Grid, zero heavy styling frameworks for maximum performance.
- **Icons**: `react-icons` (FontAwesome, Ionicons, Material Design icons).
- **Backend Architecture**: Node.js runtime, Express.js REST API framework.
- **Database Layer**: MongoDB via Mongoose with auto-switching local file store fallback (`local-store.json`) ensuring 100% functionality even when offline or in serverless environments.
- **AI Integration**: Google Gemini API via `@google/genai` with fallback heuristic parser.
- **Routing Engine**: SPA clean URL rewrites via `vercel.json`.

---

## 🔌 Backend REST API Endpoints

| Category | HTTP Method | Endpoint | Description |
| :--- | :---: | :--- | :--- |
| **Authentication** | `POST` | `/api/portal/login` | Multi-role portal login (Super Admin, Admin, Accountant, Teacher, Student, Parent) |
| **AI Admissions** | `POST` | `/api/ai/chat` | AI Admissions counseling chat with Gemini / fallback |
| **CRM Leads** | `POST` | `/api/crm/lead` | Save admission inquiries and callback requests |
| **CRM Leads** | `GET` | `/api/crm/leads` | Retrieve admissions inquiries for Administrative Desk |
| **Attendance** | `GET` | `/api/attendance/:studentId` | Retrieve daily student attendance ledger |
| **Attendance** | `POST` | `/api/attendance/leave` | Submit student leave application |
| **Fees** | `GET` | `/api/fees/:studentId` | Fetch fee dues and installment vouchers |
| **Fees** | `POST` | `/api/fees/pay` | Process online fee payment and generate receipt |
| **Parent Slips** | `POST` | `/api/portal/permission-slip` | Toggle digital parent consent on school circulars |
| **Homework** | `POST` | `/api/portal/homework/verify` | Mark homework assignment as "Parent Verified" |

---

## ⚙️ Environment Configuration

### Server (`server/.env`)
Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/my_school
CLIENT_ORIGIN=http://localhost:3000
UPLOAD_DIR=uploads

# Default Admin Seed
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# JWT Authentication
JWT_SECRET=lbmdps-super-secret-jwt-key-2026
JWT_EXPIRES_IN=7d

# Gemini AI (Obtain from https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Client (`client/.env`)
Client API configuration:

```env
# Production Live Backend URL (Render)
REACT_APP_API_URL=https://lal-bihari-mahto-divine-public-school-1.onrender.com

# For local development:
# REACT_APP_API_URL=http://localhost:5000
```

> **Note**: If `MONGODB_URI` or `GEMINI_API_KEY` are omitted, the application automatically runs in standalone offline demo mode using local JSON persistence and heuristic AI responses.

---

## 🛠️ Local Development & Quick Start

### 1. Prerequisites
- **Node.js**: v16.14.0 or higher
- **npm**: v8.0.0 or higher
- **Git**

### 2. Installation & Running
From the repository root:

```powershell
# 1. Install root dependencies
npm install

# 2. Install both client and server dependencies in one command
npm run install:all

# 3. Start development servers concurrently (React on :3000, Express on :5000)
npm start
```

### 3. Running Unit Tests
Execute the comprehensive test suite:

```powershell
npm test --prefix client -- --watchAll=false
```

### 4. Compiling Production Build
Build optimized static assets:

```powershell
npm run build
```

---

## 🌐 Vercel Public Deployment Guide

The application is pre-configured with **zero-config Single Page Application (SPA) rewrites** in both `vercel.json` (root) and `client/vercel.json`, preventing 404 errors when directly visiting sub-routes like `/parent/dashboard` or `/login`.

### Method 1: Continuous Deployment via GitHub (Recommended)

1. Initialize git and push to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete LBMDPS school management system"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. Navigate to [Vercel](https://vercel.com) and click **"Add New..." → "Project"**.
3. Select your GitHub repository and click **Import**.
4. Configure Build and Output Settings:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./` (or `client` if deploying client folder only)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/build`
5. Click **Deploy**. Vercel will build and publish your portal to a production URL with automatic HTTPS.

### Method 2: Direct Terminal Deployment via Vercel CLI

```powershell
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Deploy directly from repository root
vercel --prod
```

---

## ⚡ Keyboard Shortcuts & Power Features

- `Alt + L`: Instant Staff Login shortcut (opens `/login` with credentials modal from any page).
- `Ctrl + P` / `Cmd + P`: Optimized print layouts for Timetables, Fee Receipts, and CCE Report Cards.
- One-Click Child Switching in Parent Portal: Instantly toggles all records between enrolled siblings without re-authenticating.

---

## 📜 CBSE & NEP 2020 Compliance

- **Continuous and Comprehensive Evaluation (CCE)**: Formative (FA) and Summative (SA) assessment ledgers.
- **CBSE Subject Codes Integrated**:
  - `041` — Mathematics Standard / Basic
  - `086` — Science (Theory & Practical Labs)
  - `087` — Social Science (History, Geography, Civics, Economics)
  - `101` — English Language & Literature
  - `002` — Hindi Course-A
  - `165` — Computer Applications / Artificial Intelligence
- **Data Protection**: Strict adherence to student privacy regulations with role-based access isolation.

---

## 📄 License & Institutional Credits

- **Educational Institution**: Lal Bihari Mahto Divine Public School (LBMDPS), Naitand, Giridih, Jharkhand.
- **CBSE Affiliation No.**: 3430398 • **UDISE Code**: 20060105502
- **Lead Developer**: Nitish Kumar
- **Copyright**: © 2026 Lal Bihari Mahto Divine Public School. All rights reserved.
