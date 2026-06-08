# RAB Calculator — Phase 2 & 3 Implementation Plan

## Existing Stack
- **DB**: @vercel/postgres (raw SQL, no ORM)
- **Auth**: JWT via cookies (`kbs_token`)
- **Pattern**: `hasDatabase` check → fallback to static data when no DB

---

## Phase 2: Backend + Database

### 2.1 Database Tables (add to `src/lib/db.ts`)

```sql
-- Harga dasar per tipe bangunan (admin-updatable)
CREATE TABLE IF NOT EXISTS rab_pricing (
  id SERIAL PRIMARY KEY,
  building_type VARCHAR(50) NOT NULL,      -- rumah, ruko, gudang, kantor, workshop
  base_price_per_m2 INTEGER NOT NULL,       -- harga dasar Rp/m²
  quality VARCHAR(20) NOT NULL,             -- standar, menengah, premium
  quality_multiplier DECIMAL(3,2) NOT NULL, -- 1.00, 1.45, 2.10
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by INTEGER REFERENCES users(id)
);

-- Indeks regional (admin-updatable)
CREATE TABLE IF NOT EXISTS rab_regional_index (
  id SERIAL PRIMARY KEY,
  region VARCHAR(50) NOT NULL UNIQUE,
  region_label VARCHAR(100) NOT NULL,
  multiplier DECIMAL(4,2) NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- History kalkulasi (analytics)
CREATE TABLE IF NOT EXISTS rab_calculations (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100),                  -- anonymous tracking
  user_id INTEGER REFERENCES users(id),     -- nullable (guest allowed)
  building_type VARCHAR(50) NOT NULL,
  area INTEGER NOT NULL,
  floors INTEGER NOT NULL,
  quality VARCHAR(20) NOT NULL,
  region VARCHAR(50) NOT NULL,
  total_cost BIGINT NOT NULL,
  price_per_m2 INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads dari RAB (siapa yang klik WhatsApp/request detail)
CREATE TABLE IF NOT EXISTS rab_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  building_type VARCHAR(50),
  area INTEGER,
  floors INTEGER,
  quality VARCHAR(20),
  region VARCHAR(50),
  estimated_cost BIGINT,
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',        -- new, contacted, converted
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2.2 API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/rab/calculate` | POST | No | Calculate RAB, save to analytics |
| `/api/rab/pricing` | GET | No | Get current pricing data (public) |
| `/api/rab/leads` | POST | No | Submit lead form after calculation |
| `/api/rab/admin/pricing` | GET/PUT | Admin | View/update pricing data |
| `/api/rab/admin/analytics` | GET | Admin | View calculation stats |
| `/api/rab/admin/leads` | GET/PATCH | Admin | View/update lead status |

### 2.3 Frontend Changes

1. **Fetch pricing from API** — on page load, GET `/api/rab/pricing`. Fallback to hardcoded if no DB.
2. **Calculate via API** — POST `/api/rab/calculate` instead of client-side math. Still works offline with fallback.
3. **Lead capture form** — modal after calculation: name, phone, message → POST `/api/rab/leads`
4. **Input validation** — min 20m², max 5000m². Warning for unusual values.
5. **PDF export** — client-side PDF generation with calculation results.
6. **Save scenarios** — localStorage for comparing up to 5 calculations.

---

## Phase 3: Admin Panel + Advanced Features

### 3.1 Admin Auth

- Add `role` column to users table (default 'user', can be 'admin')
- Admin middleware check on `/api/rab/admin/*` routes
- Admin page at `/platform/admin/rab` (protected)

### 3.2 Admin Panel (`/platform/admin/rab`)

Tabs:
1. **Pricing** — table of base prices, quality multipliers, regional indices. Edit inline.
2. **Analytics** — total calculations, popular types, popular regions, daily/weekly chart data.
3. **Leads** — list of leads with status (new/contacted/converted), contact info, filter/search.

### 3.3 Advanced RAB Features

1. **Detailed breakdown** — per-item material list with volume & unit (e.g., "Semen 50kg × 120 sak = Rp X")
2. **Comparison mode** — side-by-side 2-3 saved scenarios
3. **PDF report** — branded PDF with KBS logo, project specs, breakdown table, disclaimer
4. **Share link** — encode params in URL (`/kalkulator-rab?type=rumah&area=150&...`)

---

## File Structure (new files to create)

```
src/
├── app/api/rab/
│   ├── calculate/route.ts        -- POST: calculate + save analytics
│   ├── pricing/route.ts          -- GET: public pricing data
│   ├── leads/route.ts            -- POST: submit lead
│   └── admin/
│       ├── pricing/route.ts      -- GET/PUT: manage pricing
│       ├── analytics/route.ts    -- GET: stats
│       └── leads/route.ts        -- GET/PATCH: manage leads
├── app/platform/admin/
│   └── rab/page.tsx              -- Admin panel UI
├── lib/
│   └── rab.ts                    -- Shared calculation logic + types
└── app/kalkulator-rab/
    └── page.tsx                  -- Updated FE (fetch from API, PDF, scenarios)
```

---

## Implementation Order

1. `src/lib/rab.ts` — shared types + calculation logic (used by both API and fallback)
2. Add tables to `src/lib/db.ts`
3. `GET /api/rab/pricing` — serve pricing from DB (fallback hardcoded)
4. `POST /api/rab/calculate` — calculate + log analytics
5. `POST /api/rab/leads` — lead capture
6. Update `page.tsx` — fetch pricing, call API, lead form modal, PDF export, scenarios
7. Admin API routes
8. Admin panel UI
9. PDF generation
10. Share link feature

---

## Design Decisions

- **Graceful fallback**: If `POSTGRES_URL` empty → use hardcoded data (already works). No breaking change.
- **No new dependencies**: PDF via browser `window.print()` + CSS `@media print`, or lightweight `jspdf`.
- **Admin uses same JWT**: Just check `role === 'admin'` in token payload. No separate auth flow.
- **Analytics are anonymous by default**: `session_id` from a random UUID stored in sessionStorage. If logged in, also store `user_id`.
