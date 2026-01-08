# Contest Hub

**Live Site:** [https://contest-hub-d2b82.web.app](https://contest-hub-d2b82.web.app)
**Project image ScreenShot: (https://i.ibb.co.com/VYbHRmH1/Contest-hub.png)

---

## Website Overview
Contest Hub is a modern contest management platform where users can participate in contests, track their performance, and win prizes. The platform provides both user and admin dashboards, ensuring smooth contest management and participation experience. The site is fully responsive and works seamlessly on mobile, tablet, and desktop.

---

## Features

1. **User Registration & Authentication:** Secure Firebase authentication with profile management.  
2. **Dark/Light Mode:** Users can toggle between dark and light themes; choice is saved in localStorage.  
3. **Contest Participation:** Users can browse, register, and pay for contests through Stripe payment integration.  
4. **Winner Management:** Admins can declare winners and users can track their winning contests.  
5. **Leaderboard:** Displays top contest winners ranked by number of wins.  
6. **Responsive Design:** Fully responsive for mobile, tablet, and desktop devices.  
7. **My Profile:** Users can update their name, photo, and other profile details; see win percentage.  
8. **Admin Dashboard:** Manage contests, approve/reject, and delete contests with pagination (10 items per page).  
9. **Recent Winners & Motivation Section:** Showcases inspiring winners with prizes and contest details.  
10. **Contact Page:** Users can send messages via a simple form using React Hook Form and SweetAlert.  
11. **About Page:** Information about the platform, features, and opportunities for users.  
12. **JWT-secured APIs:** Private routes protected using Firebase JWT tokens for secure API access.  

---
## Extra Section 
 **In Navbar:** 
 - About
 - Contact

## Tech Stack

**Client-side:**
- React 19
- Vite
- TailwindCSS + DaisyUI
- React Hook Form
- React Router
- React Query
- Framer Motion
- SweetAlert2
- Recharts
- Firebase Authentication
- Axios

**Server-side:**
- Node.js + Express
- MongoDB (Atlas)
- Firebase Admin SDK
- Stripe for payments
- JWT Token Verification

---

## Installation

**Client:**
```bash
cd client
npm install
npm run dev

 **Server:**
cd server
npm install
npm start
 **Folder Structure:**

Client:
contest-hub-client/
 ├─ src/
 │   ├─ Pages/
 │   ├─ Components/
 │   ├─ Hooks/
 │   └─ assets/
 └─ package.json
 Server:
 contest-hub-server/
 ├─ index.js
 └─ package.json

 Notes:

1.Ensure .env files are configured for Firebase, MongoDB, and Stripe.

2.The dashboard is fully responsive with separate views for users and admin.

3.Pagination is implemented on admin manage contests page (10 items per page).

Author

Md Badsha Golder

