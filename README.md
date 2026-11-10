# WorkNity 🧑‍💻

> A modern, full-stack job portal connecting job seekers with hiring companies. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

Forget the job board black hole. **WorkNity** is where opportunity meets connection—lightning-fast, fully responsive across any device, and designed with a seamless single-page application experience.

---

## 🌟 Key Features

### 👤 For Job Seekers
- **Profile Management:** Build and update personal profiles, contact info, job title, and resume uploads via Cloudinary.
- **Advanced Search & Filtering:** Find jobs easily with keywords, location, job types (*Full-Time, Part-Time, Contract*), experience levels, and sorting (*Newest, Oldest, A-Z, Z-A*).
- **Seamless One-Click Application:** Apply for jobs instantly without page reloads. Instant state transitions update the button directly to `✓ Applied` with double-click protection and toast feedback.
- **Smart Navigation:** Intelligent scroll restoration ensures detail pages open directly at the top, without interrupting in-page filters or sorting.
- **Similar Job Recommendations:** Browse related positions directly from any job detail page.

### 🏢 For Employers & Recruiters
- **Company Profile Showcase:** Manage company details, branding, logo, location, and about section.
- **Job Posting & Management:** Post, update, and remove job listings with descriptions, requirements, and salaries.
- **Applicant Review:** Review real-time candidate profiles, resumes, and contact info for all posted positions.

### 🛡️ Security & Performance
- **Secure Authentication:** JWT-based stateless authentication with hashed passwords (`bcryptjs`).
- **Production Hardened:** HTTP security headers with `helmet`, NoSQL injection defense with `express-mongo-sanitize`, and API rate limiting on authentication routes.
- **Optimized SPA Architecture:** Client built with Vite for sub-second hot reloading and optimized production bundles.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Redux Toolkit, React Router v6, React Hook Form, Yup, Headless UI, Axios, React Toastify, React Icons, Moment.js, React Helmet |
| **Backend** | Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), bcryptjs, CORS, Morgan, dotenv |
| **Database** | MongoDB Atlas |
| **Storage & Media** | Cloudinary (Resumes & Profile Logos) |
| **Security** | Helmet, Express Rate Limit, Express Mongo Sanitize, Express XSS Sanitizer |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database cluster
- [Cloudinary](https://cloudinary.com/) account (for file/resume uploads)

---

### 1. Clone the Repository
```bash
git clone https://github.com/nikhilpnath/worknity.git
cd worknity
```

---

### 2. Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `client/`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:5173`.*

---

### 3. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd ../server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `server/`:
   ```env
   PORT=8000
   MONGO_URL=your_mongodb_connection_string/worknity
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:8000`.*

---

## 📡 API Overview

### Seekers / Users (`/api/user`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new job seeker |
| `POST` | `/api/user/login` | Login as job seeker |
| `GET` | `/api/user/get-user` | Get current seeker profile |
| `GET` | `/api/user/get-user-profile/:id` | Get seeker profile by ID |
| `PUT` | `/api/user/update-user` | Update seeker profile |
| `POST` | `/api/user/apply-job/:jobId` | Apply for a job |
| `DELETE` | `/api/user/delete-user` | Delete user account |

### Companies (`/api/companies`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/companies/register` | Register a new company |
| `POST` | `/api/companies/login` | Company login |
| `GET` | `/api/companies/get-company-profile` | Get current company profile |
| `GET` | `/api/companies/get-company/:id` | Get company profile by ID |
| `PUT` | `/api/companies/update-company` | Update company profile |
| `GET` | `/api/companies` | List all companies |

### Jobs (`/api/jobs`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/jobs/find-jobs` | Search, filter, and paginate jobs |
| `GET` | `/api/jobs/get-job-detail/:id` | Get job details and similar jobs |
| `POST` | `/api/jobs/upload-job` | Post a new job |
| `PUT` | `/api/jobs/update-job/:jobId` | Update a job listing |
| `DELETE` | `/api/jobs/delete-job/:jobId` | Delete a job listing |

### Authentication Check (`/api/token`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/token/checkToken` | Verify JWT token validity |

---

## 📸 Screenshots

### For Job Seekers
**Profile Management**  
![Profile](https://github.com/nikhilpnath/worknity/assets/136011015/60b0087c-d2b9-4f17-bfd7-ee5c93e6d881)

**Search, Filter & Sort**  
![functionality](https://github.com/nikhilpnath/worknity/assets/136011015/f6390989-e4d6-4882-8798-3c9ccd0ec866)

**Job Details & Application**  
![Apply Job](https://github.com/nikhilpnath/worknity/assets/136011015/3cc66ff6-4463-46ea-9efe-7b3200f5dd80)

---

### For Companies
**Company Profile**  
![cmpProfile](https://github.com/nikhilpnath/worknity/assets/136011015/c97e66d6-be25-4031-ad4d-010353fdc638)

**Post a Job**  
![uploadJob](https://github.com/nikhilpnath/worknity/assets/136011015/8d4bed12-1d9a-444e-b318-09e106c91eb9)

**Job Description & Requirements**  
![jobDes](https://github.com/nikhilpnath/worknity/assets/136011015/519d6bdc-3ce5-417c-be70-c82120b169a2)

**Candidate & Applicant Management**  
![applicants](https://github.com/nikhilpnath/worknity/assets/136011015/78a84e3c-2625-4c82-8ec6-8d53440f654b)
