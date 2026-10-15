# Het Patel — Full Stack MERN Developer Portfolio & CMS

A production-ready, dark-aesthetic portfolio and CMS platform built for **Het Patel**, Full Stack MERN Developer. Engineered with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Express.js**, **Node.js**, and a resilient **Dual-Engine MongoDB / Local Store**.

---

## 🌟 Key Features

### 🎨 Visual & Interactive Experience
- **Dark Aesthetic**: Deep `#0C0C0C` theme, typography using Google Fonts (**Kanit**, **Playfair Display**, **Syne**), and neon accent glows.
- **Hero Section**: Mouse-following magnetic portrait, entrance choreography, and dual-action resume button (live PDF preview & direct download).
- **Infinite Marquee**: Dual-row fluid infinite reel featuring 21 high-definition motion frames.
- **Scroll-Reveal About**: Scroll-driven character-by-character opacity reveal animation (`AnimatedText`).
- **Horizontal Sliding Project Showcase**: 
  - Ultra-smooth horizontal slide-in transition from the right (`x: 100% -> 0%`).
  - Sticky-stacking card presentation with dynamic background customization.
  - Interactive project detail modal with live project launch links.
- **Contact Me Modal**: Responsive contact drawer connecting directly to the backend API.

### 🛡️ Private Admin Studio & CMS (`/login`)
- **Zero Public Footprint**: Invisible to public visitors (no admin buttons or links on public pages). Accessible exclusively via direct URL: `/login`.
- **Static & Configurable Credentials**: Default `hetpatel` / `hetpatel2026` (customizable via `.env`).
- **JWT Authentication**: Token expiration, security headers (`nosniff`, `SAMEORIGIN`, `XSS-Protection`), and disabled server fingerprints.
- **Inquiries Inbox**:
  - Track visitor interest and project inquiries in real-time.
  - Lifecycle status badges: `New`, `Contacted`, `In Discussion`, `Closed`.
  - Direct mailto reply trigger and inquiry notes.
- **Project CMS**:
  - Live create, update, and delete projects.
  - Custom background image upload (file upload, preset gradients, or external URLs).
  - Metrics tracking and project reordering.

### ⚡ Resilient Dual-Data Engine
- Connects automatically to **MongoDB Atlas** or local MongoDB.
- If MongoDB is unavailable or offline, the server automatically falls back to an atomic in-memory/JSON store (`server/data/store.json`), guaranteeing 100% uptime with zero downtime or database crashes.

---

## 📂 Project Structure

```text
Het-patel/
├── .gitignore                 # Root gitignore (clean repository for deployment)
├── package.json               # Root scripts & unified deployment commands
├── vercel.json                # Root Vercel SPA configuration
├── README.md                  # Complete project documentation
│
├── client/                    # Frontend (React 19 + TypeScript + Vite)
│   ├── index.html             # Enhanced SEO, Open Graph & theme tags
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite build configuration & API proxy
│   ├── vercel.json            # Vercel SPA client rewrite rules
│   ├── .env.example           # Client environment template
│   ├── public/
│   │   ├── _redirects         # Netlify SPA rewrite rules
│   │   ├── het-patel-resume.pdf # Het Patel's downloadable Resume
│   │   └── favicon.png
│   └── src/
│       ├── main.tsx           # React entry point
│       ├── App.tsx            # Routes: Home, Admin Studio, Login
│       ├── components/        # UI components (Hero, Projects, Navbar, etc.)
│       ├── services/          # API client with dynamic base URL
│       └── data/              # Initial portfolio dataset
│
└── server/                    # Backend API (Node.js + Express)
    ├── package.json           # Server dependencies & scripts
    ├── .gitignore             # Backend gitignore
    ├── .env.example           # Server environment template
    ├── data/
    │   └── store.json         # Resilient JSON fallback datastore
    └── src/
        ├── index.js           # Express app, security middleware & static serving
        ├── config/db.js       # MongoDB connection & status monitor
        ├── models/            # Mongoose schemas (Contact, Project, Skill, Profile)
        ├── routes/            # Express REST routes (/api/*)
        └── controllers/       # Route handlers & database controllers
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(This automatically installs root, client, and server dependencies)*

### 2. Configure Environment (Optional for local dev)
Copy the server environment template:
```bash
cp server/.env.example server/.env
```

### 3. Start Development Servers
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Admin Studio Login**: [http://localhost:5173/login](http://localhost:5173/login)

---

## 🌐 Production Deployment Guides

### Option 1: Unified Full-Stack Single-Origin (Recommended: Render / Railway)

In this setup, Node.js serves both the Express API (`/api/*`) and the compiled React frontend (`client/dist`) from a single domain and port.

#### Deploy on Render (Web Service):
1. Create a **New Web Service** and connect your GitHub repository.
2. Configure settings:
   - **Environment**: `Node`
   - **Build Command**:
     ```bash
     npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
3. Set **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render defaults to 10000 or sets this automatically)
   - `JWT_SECRET`: *(A random 32+ character string)*
   - `ADMIN_USERNAME`: `hetpatel`
   - `ADMIN_PASSWORD`: *(Your secure password)*
   - `MONGODB_URI`: *(Optional: MongoDB Atlas connection string. If omitted, built-in JSON storage will be used automatically)*
4. Click **Deploy Web Service**.

---

### Option 2: Decoupled Hosting (Vercel Frontend + Render Backend)

Host the client on Vercel's global CDN and the server on Render or Railway.

#### Step 1: Deploy Backend (Render / Railway)
1. Set Root Directory to `server` (or deploy root with Start Command `node server/src/index.js`).
2. Build Command: `npm install`.
3. Set environment variables (`PORT`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `MONGODB_URI`).
4. Note your deployed backend URL: e.g. `https://het-patel-api.onrender.com`.

#### Step 2: Deploy Frontend (Vercel)
1. Import the repository in [Vercel](https://vercel.com).
2. Configure project:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add **Environment Variable**:
   - `VITE_API_URL`: `https://het-patel-api.onrender.com/api`
4. Click **Deploy**. Vercel will automatically apply the provided `client/vercel.json` SPA rewrite rules.

---

## 🔐 Admin Studio Credentials & Access

- **Login URL**: Visit `/login` on your deployed site (e.g., `https://your-domain.com/login`).
- **Default Username**: `hetpatel`
- **Default Password**: `hetpatel2026`
- **To change credentials in production**: Simply update the `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables in your hosting provider's dashboard.

---

## 📋 Available Root Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both client (Vite) and server (Express) concurrently for development |
| `npm run dev:client` | Runs only the client development server on port 5173 |
| `npm run dev:server` | Runs only the Express backend server on port 5000 |
| `npm run build` | Builds the client for production into `client/dist` |
| `npm start` | Launches the production Express server (serves API + static client) |
| `npm run install:all` | Installs dependencies across root, client, and server |

---

## 📄 License

This project is personal intellectual property of **Het Patel**. All rights reserved.
