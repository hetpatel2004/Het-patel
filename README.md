# Jack — 3D Creator Portfolio (MERN Stack)

A high-performance, dark-themed 3D Creator portfolio landing page built with **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lucide React**, **Express**, **Node.js**, and **MongoDB**.

---

## 🌟 Key Features

- **Dark Aesthetic**: Deep `#0C0C0C` background, fluid typography with Google Font **Kanit** (weights 300–900).
- **Hero Section**:
  - Massive responsive heading: `"Hi, i'm jack"` with custom linear gradient (`#646973` to `#BBCCD7`).
  - Centered hero portrait with a mouse-following **`Magnet`** component.
  - Fluid bottom bar with responsive typography and custom gradient **`ContactButton`**.
  - Fade-in entrance choreography powered by Framer Motion.
- **Marquee Section**:
  - Two rows containing 21 high-res animated GIFs from `motionsites.ai`.
  - Passive window scroll calculation moving Row 1 to the right and Row 2 to the left.
  - Tripled elements for seamless infinite scrolling.
- **About Section**:
  - Four decorative 3D floating corner icons with individual parallax-entry delays.
  - Scroll-driven **character-by-character text reveal animation** (`AnimatedText`) from opacity 0.2 to 1.0.
- **Services Section**:
  - Clean white `#FFFFFF` contrast block with heavy top rounded corners (`rounded-t-[60px]`).
  - 5 detailed 3D services with large typographic numbers, titles, and descriptions separated by hairline borders.
- **Projects Section**:
  - 3 sticky-stacking project cards (`h-[85vh]`, `useScroll` and `useTransform` scale calculations).
  - Heavy rounded corners (`rounded-[60px]`) and 2-column image grids.
  - Interactive ghost `Live Project` button with detailed preview modal.
- **MERN Stack Backend**:
  - Express.js REST API with routes for inquiries (`/api/contact`), projects (`/api/projects`), and services (`/api/services`).
  - Mongoose MongoDB schemas with automatic fallback store.
  - Real-time contact form modal with direct API integration.

---

## 📂 Project Structure

```text
Het_Patel_Portfolio/
├── package.json               # Root scripts (concurrently running client & server)
├── server/                    # Node.js + Express + MongoDB backend
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js           # Server entry point
│       ├── config/db.js       # MongoDB connection & fallback
│       ├── models/            # Contact, Project, Service schemas
│       ├── controllers/       # Business logic & seeders
│       └── routes/            # REST API endpoints
└── client/                    # React + Vite + TypeScript + Tailwind
    ├── package.json
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── api/contactApi.ts  # Backend API client
        ├── data/              # Projects, services, marquee data
        └── components/
            ├── Navbar.tsx
            ├── HeroSection.tsx
            ├── MarqueeSection.tsx
            ├── AboutSection.tsx
            ├── ServicesSection.tsx
            ├── ProjectsSection.tsx
            ├── ContactModal.tsx
            ├── PricingModal.tsx
            ├── LiveProjectModal.tsx
            ├── ContactButton.tsx
            ├── LiveProjectButton.tsx
            ├── FadeIn.tsx
            ├── Magnet.tsx
            └── AnimatedText.tsx
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(or run `npm install` in root, `client`, and `server`)*

### 2. Start Development Mode (Full MERN Stack)
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 3. Build for Production
```bash
npm run build
```
