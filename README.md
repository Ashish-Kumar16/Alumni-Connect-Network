# Alumni Connect Network

Alumni Connect Network is a web platform that bridges the gap between students and alumni, enabling mentorship, career guidance, and job opportunities. Built with React, Material UI, and Redux Toolkit, it provides a modern, user-friendly interface for networking, job postings, and mentorship management.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

---

## About the Project

**Alumni Connect Network** is designed to help students and alumni connect for mentorship, career advice, and job opportunities. Students can browse job postings, apply for positions, and request mentorship from experienced alumni. Alumni can offer mentorship, post jobs, and manage requests from students.

Key modules include:
- **Authentication:** Secure login and registration for students and alumni.
- **Profile Management:** Users can update their profile, skills, education, and experience.
- **Job Board:** Alumni post jobs; students browse and apply.
- **Mentorship Program:** Alumni offer mentorship; students request guidance.
- **Dashboards:** Personalized dashboards for both user types.

---

## Features

- **User Authentication:** Register and log in as a student or alumni.
- **Profile Management:** Update your profile, skills, education, and experience.
- **Job Board:** Browse, post, and apply for jobs.
- **Mentorship Program:** Alumni can offer mentorship; students can request mentorship.
- **Personal Dashboards:** Tailored dashboards for students and alumni.
- **Application Tracking:** View and manage job applications and mentorship requests.
- **Responsive UI:** Built with Material UI for a modern look and feel.

---

## Screenshots

> _Add screenshots here to showcase the dashboard, job board, mentorship features, etc._

---

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   └── layout/
│   ├── hooks/
│   ├── pages/
│   │   ├── CreateOffer.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Index.jsx
│   │   ├── JobDetail.jsx
│   │   ├── Jobs.jsx
│   │   ├── Login.jsx
│   │   ├── MentorDetail.jsx
│   │   ├── Mentors.jsx
│   │   ├── MentorshipRequests.jsx
│   │   ├── MyApplications.jsx
│   │   ├── NotFound.jsx
│   │   ├── PostJob.jsx
│   │   ├── Profile.jsx
│   │   └── Register.jsx
│   ├── services/
│   ├── store/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Ashish-Kumar16/Alumni-Connect-Network.git
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Open your browser and visit:**

   ```
   http://localhost:5173
   ```

---

## Available Scripts

- `npm run dev` – Start the Vite development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build

---

## Technologies Used

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [Notistack](https://iamhosseindhv.com/notistack) (for notifications)

---

