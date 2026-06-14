# KBS Digital Construction Platform

Platform manajemen konstruksi digital oleh **PT Karya Bangun Semesta** — menggabungkan pengalaman kontraktor dengan teknologi modern untuk efisiensi operasional proyek.

## Overview

KBS bukan sekadar company profile. Ini adalah platform digital end-to-end yang dibangun untuk operasional konstruksi nyata:

- **Equipment Booking** — Pemesanan alat berat online dengan harga transparan
- **Material Store** — Marketplace material bangunan dengan pengiriman ke lokasi proyek
- **Project Tracking** — Monitoring progres proyek real-time dengan dashboard, milestone, dan budget
- **Kalkulator RAB** — Estimasi biaya otomatis berdasarkan spesifikasi proyek
- **Invoice & Billing** — Sistem penagihan terintegrasi
- **AI Intelligence** — Analisis dan rekomendasi berbasis AI untuk pengambilan keputusan proyek

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Database:** PostgreSQL (via Vercel Postgres)
- **Auth:** JWT + bcrypt
- **Maps:** Mapbox GL
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## Project Structure

```
src/
├── app/
│   ├── api/          → REST API endpoints (auth, equipment, materials, projects, RAB)
│   ├── components/   → Reusable UI components
│   ├── context/      → Auth, Theme, Language providers
│   ├── platform/     → Digital platform pages (booking, tracking, store, admin)
│   ├── services/     → Service detail pages
│   ├── insight/      → Industry articles & blog
│   └── about/        → Company profile, history, ISO certifications
├── lib/              → Utilities (auth, db, RAB calculation)
├── components/       → Shared components (maps)
└── translations/     → i18n (Bahasa Indonesia & English)
```

## Key Features

- Multi-language support (ID/EN)
- Dark/Light mode
- Responsive design
- Security headers (HSTS, X-Frame-Options, CSP)
- Role-based access control
- Real-time project monitoring dashboard

## About PT Karya Bangun Semesta

General Contractor & Heavy Equipment services berbasis di Jakarta Timur. Berpengalaman dalam pembangunan gedung, infrastruktur, dan pengelolaan alat berat — kini bertransformasi digital melalui platform BangunHub.

## License

Private — All rights reserved © 2026 PT Karya Bangun Semesta
