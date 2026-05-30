# Mini Recruitment Dashboard

A modern, responsive recruitment management dashboard built with React, TypeScript, and Tailwind CSS. Designed with a clean SaaS-style UI for managing jobs, tracking candidates through a Kanban pipeline, and viewing recruitment metrics.

## Features

- **Authentication** — Dummy login with LocalStorage session persistence
- **Dashboard Overview** — Stat cards with trend indicators and bar charts
- **Job Management** — CRUD-style job listing with search, status filter, pagination, and modal form
- **Candidate Pipeline** — Drag-and-drop Kanban board (Applied → Interview → Hired)
- **Dark Mode** — Toggle between light and dark themes
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Toast Notifications** — Feedback for user actions
- **Loading Skeletons** — Placeholder UI during data load

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18+ | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| React Router DOM | Client-side routing |
| Context API | Global state management |
| LocalStorage | Data persistence |
| @hello-pangea/dnd | Drag and drop |
| Recharts | Dashboard charts |
| Framer Motion | Animations |
| Lucide React | Icons |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd mini-recruitment-dashboard
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

## Demo Login

| Field | Value |
|---|---|
| Email | `admin@recruit.com` |
| Password | `admin123` |

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no extra configuration needed
4. Click **Deploy**

The included `vercel.json` handles SPA routing so all routes redirect to `index.html`.

### Build Settings (auto-detected)

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

## Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, DashboardLayout
│   ├── dashboard/       # StatCard, StatsChart
│   ├── jobs/            # JobsTable, JobForm, JobsToolbar
│   ├── pipeline/        # KanbanBoard
│   └── ui/              # Button, Input, Modal, Toast, etc.
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Jobs.tsx
│   └── Candidates.tsx
├── hooks/
│   ├── useDashboardStats.ts
│   └── useJobsFilter.ts
├── context/
│   └── AppContext.tsx
├── types/
│   └── index.ts
├── data/
│   └── seed.ts
├── utils/
│   ├── storage.ts
│   ├── validation.ts
│   ├── format.ts
│   └── chartData.ts
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── App.tsx
└── main.tsx
```

## Color Palette

| Token | Hex |
|---|---|
| Primary | `#2563EB` |
| Secondary | `#3B82F6` |
| Background | `#F8FAFC` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

## License

MIT
