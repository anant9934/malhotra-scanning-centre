# Malhotra Scanning Centre - Master Codebase Architecture & Developer Guide

Welcome to the Malhotra Scanning Centre website repository. This document serves as the ultimate developer guide. Whether you are onboarding onto the project, fixing a bug, or deploying the application, reading this guide will give you a complete understanding of the architecture, data flow, and deployment processes.

---

## 🏗️ 1. Tech Stack Overview

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Vanilla CSS Modules (`*.module.css`) + Global CSS variables
- **Database ORM**: Prisma
- **Database**: Local SQLite (`dev.db`) for Appointments
- **Backend APIs**: Next.js Server Actions (No traditional REST `/api` routes)
- **Icons**: `lucide-react`
- **Deployment Target**: Netlify (Serverless)
- **Third-Party Integrations**: Supabase SDK (Configured for future managed database/auth scaling)

---

## 📂 2. Directory Structure & Architecture

The project strictly follows a high-cohesion, low-coupling component architecture.

```text
msc-website/
├── .env                        # Environment variables (Prisma, Supabase, Admin Pass)
├── prisma/                     # Database schemas and migrations
│   └── schema.prisma           # Prisma schema definition
├── public/                     # Static assets (images, logos)
├── src/
│   ├── app/                    # Next.js App Router (All Pages & Layouts)
│   │   ├── actions/            # Server Actions (Backend Logic)
│   │   │   ├── appointment.ts  # Logic for saving/deleting appointments
│   │   │   ├── auth.ts         # Logic for admin login/logout
│   │   │   └── settings.ts     # Logic for reading/writing dynamic JSON settings
│   │   ├── admin/              # Admin Dashboard Routes
│   │   ├── about/              # Public Pages...
│   │   ├── centres/
│   │   ├── contact/
│   │   ├── radiologist/
│   │   ├── services/
│   │   ├── layout.tsx          # Root Layout (Fonts, Global Wrapper)
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable UI Components
│   │   ├── admin/              # Admin-specific components (PricingEditor, etc.)
│   │   ├── home/               # Homepage-specific sections (Hero, TrustBand, etc.)
│   │   ├── layout/             # Shared layout components (Header, Footer)
│   │   └── ui/                 # Generic UI components (Buttons)
│   ├── data/                   # Static and Dynamic Data
│   │   ├── admin-settings.json # DYNAMIC STORE for prices, contact numbers, taglines
│   │   ├── services.ts         # STATIC source of truth for all medical services
│   │   └── testimonials.ts     # Verified Google reviews data
│   ├── hooks/                  
│   │   └── useAdminData.ts     # Custom hook managing state for the Admin Dashboard
│   ├── lib/                    
│   │   └── prisma.ts           # Prisma client singleton (prevents connection leaks)
│   ├── types/                  
│   │   └── index.ts            # Global TypeScript interfaces
│   └── utils/
│       └── supabase/           # Supabase client, server, and middleware utilities
└── middleware.ts               # Next.js Edge Middleware (Route protection & Supabase)
```

---

## 💾 3. Data Flow & Persistence

This application uses a **hybrid data model** to separate CMS-like settings from transactional data.

### A. Transactional Data (Appointments)
- **Where:** Stored in a local SQLite database (`dev.db`) using Prisma.
- **Model:** `Appointment` (Patient Name, Phone, Investigation, Date, Time, Status).
- **Flow:** Patient submits form -> Server Action (`submitAppointment`) -> Prisma inserts record -> Admin Dashboard reads via `getAppointments`.

### B. Dynamic CMS Data (Settings, Prices, Contacts)
- **Where:** Stored in a JSON file: `src/data/admin-settings.json`.
- **Flow:** Admin edits a price in the dashboard -> Server Action (`updateSettings`) writes to the JSON file using `fs.writeFile` -> `revalidatePath()` is called to flush the Next.js cache -> Public UI instantly updates.

### C. Static Data (Service Catalog & Reviews)
- **Where:** Hardcoded in `src/data/services.ts` and `src/data/testimonials.ts`.
- **Why:** Ensures the foundational structure of services (titles, descriptions, icons) doesn't easily break. The JSON file only overrides *prices* and *metadata*.

---

## 🔐 4. Authentication & Security

- **Admin Login:** Protected by a simple cookie-based authentication system located in `src/app/actions/auth.ts`. The password relies on the `ADMIN_PASSWORD` environment variable (defaults to `admin123`).
- **Route Protection:** The `src/middleware.ts` intercepts requests to `/admin`. If the `admin_auth` cookie is missing, the user is redirected to `/admin/login`.
- **Supabase Integration:** The Supabase SDK is pre-installed and configured in `src/utils/supabase/` in preparation for migrating from SQLite to a managed Supabase PostgreSQL instance (highly recommended for Netlify serverless deployments).

---

## 🚀 5. Deployment Guide (Netlify)

This project is built for serverless environments. If deploying to **Netlify**, please read these critical caveats:

### The SQLite Serverless Problem
Netlify uses ephemeral, read-only serverless functions. 
**WARNING:** If you deploy this with SQLite (`dev.db`), the database will reset to its initial state every time the serverless function spins down. Patient appointments will be lost. 

### How to Fix for Production:
1. Go to your **Supabase Dashboard** and copy the Postgres Connection String.
2. Open `prisma/schema.prisma` and change `provider = "sqlite"` to `provider = "postgresql"`.
3. In Netlify's Environment Variables settings, add:
   - `DATABASE_URL` (Your Supabase Postgres string)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Run `npx prisma db push` against your production database to create the schema.
5. Netlify will now successfully run the app connecting to Supabase Postgres.

---

## 🐛 6. How to Fix Bugs (Developer Cheat Sheet)

If you are tasked with fixing a bug, use this matrix to find the source immediately:

| Bug Description | Where to Look | How to Fix |
| :--- | :--- | :--- |
| **A price on the UI isn't updating** | `src/app/actions/settings.ts` | Ensure `revalidatePath('/')` is firing after the JSON write. Check if Netlify's read-only file system is blocking the JSON write (consider migrating settings to the DB). |
| **UI colors look wrong** | `src/app/globals.css` | All primary colors (gold, green, backgrounds) are CSS variables defined in the `:root`. Modify them here. |
| **New appointment isn't showing in Admin** | `src/hooks/useAdminData.ts` | The admin panel polls data every 5 seconds. Check the browser console network tab to see if `getAppointments` server action is failing. |
| **TypeScript Type Errors** | `src/types/index.ts` | Ensure the object structure matches the shared interfaces. Never use `any`. |
| **A new route is unstyled** | `Route/page.module.css` | Create a local CSS module for the route, or use global utility classes (`.container`, `.section-padding`). |

### Recommended Debugging Workflow:
1. Run locally using `npm run dev`.
2. Check the Terminal for Server Action/Prisma errors.
3. Check the Browser Console for React hydration errors.
4. If modifying data structures, always run `npm run build` to ensure TypeScript compilation passes.

---

## 🛠️ 7. Local Development Setup

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
4. **Push Schema to Local DB:**
   ```bash
   npx prisma db push
   ```
5. **Start Development Server:**
   ```bash
   npm run dev
   ```
6. Visit `http://localhost:3000` to see the site.
7. Visit `http://localhost:3000/admin` to access the dashboard (Password: `admin123`).
