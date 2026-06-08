# Plan: Real-time Project Dashboard with Interactive Map

## Overview
Build a full project management system with:
- Mapbox GL interactive map showing active project locations
- Admin panel to manage projects (CRUD + progress updates + photo uploads)
- Client portal to view their own projects (read-only)
- Pre-fill 18 existing projects with estimated GPS coordinates

## Database Schema

### Table: `projects`
```sql
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
title_en VARCHAR(255),
client VARCHAR(255),
category VARCHAR(100), -- building, infrastructure, interior, etc.
sub_category VARCHAR(100),
description TEXT,
description_en TEXT,
contract_number VARCHAR(100),
location_name VARCHAR(255), -- "Jakarta Timur"
latitude DECIMAL(10, 7),
longitude DECIMAL(10, 7),
start_date DATE,
end_date DATE,
estimated_end_date DATE,
progress INTEGER DEFAULT 0, -- 0-100
status VARCHAR(50) DEFAULT 'planning', -- planning, active, on_hold, completed
current_phase VARCHAR(100),
budget BIGINT,
image_url VARCHAR(500),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
```

### Table: `project_updates`
```sql
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES projects(id),
title VARCHAR(255),
description TEXT,
progress_change INTEGER, -- e.g. +5 means went from 60->65
photos TEXT[], -- array of photo URLs
updated_by INTEGER REFERENCES users(id),
created_at TIMESTAMP DEFAULT NOW()
```

### Table: `project_team`
```sql
id SERIAL PRIMARY KEY,
project_id INTEGER REFERENCES projects(id),
user_id INTEGER REFERENCES users(id),
role VARCHAR(50) -- 'client', 'pm', 'engineer'
```

## API Endpoints

### Public
- `GET /api/projects` — List all projects (for public map showcase)
- `GET /api/projects/[id]` — Single project detail

### Client (auth required)
- `GET /api/projects/my` — Client's own projects (via project_team)
- `GET /api/projects/[id]/updates` — Progress update timeline

### Admin (role: admin)
- `POST /api/projects/admin` — Create project
- `PUT /api/projects/admin/[id]` — Update project
- `DELETE /api/projects/admin/[id]` — Delete project
- `POST /api/projects/admin/[id]/updates` — Add progress update
- `POST /api/projects/admin/[id]/team` — Assign client/team to project

## Pages

### 1. `/projects` — Public Projects + Map (redesign existing)
- Mapbox GL map at top showing all project pins (color-coded by status)
- Click pin → popup with project name, progress, photo
- Below: existing project grid (now fetched from DB instead of hardcoded)

### 2. `/platform/project-tracking` — Client Dashboard (redesign existing)
- Only shows projects assigned to logged-in user
- Map showing their projects
- Progress timeline with photos
- Status cards with key metrics

### 3. `/platform/admin/projects` — Admin Panel (new)
- CRUD table for all projects
- Inline progress update (slider)
- Add update with photos
- Assign clients to projects
- Set GPS coordinates (click on map or enter manually)

## Pre-filled Data
Migrate 18 existing projects with estimated GPS:
- Jakarta Timur → -6.225, 106.900
- Bekasi → -6.235, 107.000
- Bogor → -6.595, 106.816
- Depok → -6.392, 106.822
- etc.

## Dependencies
- `mapbox-gl` + `react-map-gl` — Mapbox GL for React
- Environment variable: `NEXT_PUBLIC_MAPBOX_TOKEN`

## Files to Create/Modify
1. `src/lib/db.ts` — Add projects, project_updates, project_team tables
2. `src/app/api/projects/route.ts` — Public project list
3. `src/app/api/projects/[id]/route.ts` — Single project
4. `src/app/api/projects/my/route.ts` — Client's projects
5. `src/app/api/projects/[id]/updates/route.ts` — Updates timeline
6. `src/app/api/projects/admin/route.ts` — Admin CRUD
7. `src/app/api/projects/admin/[id]/route.ts` — Admin update/delete
8. `src/app/api/projects/admin/[id]/updates/route.ts` — Admin add update
9. `src/app/api/projects/admin/[id]/team/route.ts` — Team assignment
10. `src/app/platform/project-tracking/page.tsx` — Client dashboard (rewrite)
11. `src/app/platform/admin/projects/page.tsx` — Admin panel (new)
12. `src/components/ProjectMap.tsx` — Reusable Mapbox component
13. `src/app/api/seed/route.ts` — Pre-fill 18 projects
14. `src/app/projects/page.tsx` — Integrate map + fetch from DB
