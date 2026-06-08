import { sql } from '@vercel/postgres';

export const hasDatabase = !!process.env.POSTGRES_URL;

export async function initDatabase() {
  if (!hasDatabase) return;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      phone VARCHAR(50),
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS equipment (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      category VARCHAR(100),
      price_per_day INTEGER,
      specs JSONB,
      location VARCHAR(255),
      available BOOLEAN DEFAULT true,
      image VARCHAR(500),
      rating DECIMAL(2,1) DEFAULT 4.5,
      reviews INTEGER DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      equipment_id INTEGER REFERENCES equipment(id),
      start_date DATE,
      end_date DATE,
      total_price INTEGER,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS materials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      category VARCHAR(100),
      brand VARCHAR(255),
      price INTEGER,
      unit VARCHAR(50),
      stock INTEGER DEFAULT 100,
      image VARCHAR(500),
      rating DECIMAL(2,1) DEFAULT 4.5,
      sold INTEGER DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS material_orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      items JSONB,
      total_price INTEGER,
      status VARCHAR(50) DEFAULT 'pending',
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // RAB Calculator tables
  await sql`
    CREATE TABLE IF NOT EXISTS rab_pricing (
      id SERIAL PRIMARY KEY,
      building_type VARCHAR(50) NOT NULL,
      base_price_per_m2 INTEGER NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS rab_quality (
      id SERIAL PRIMARY KEY,
      quality VARCHAR(20) NOT NULL UNIQUE,
      multiplier DECIMAL(3,2) NOT NULL,
      description_id TEXT,
      description_en TEXT,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS rab_regional_index (
      id SERIAL PRIMARY KEY,
      region VARCHAR(50) NOT NULL UNIQUE,
      region_label VARCHAR(100) NOT NULL,
      multiplier DECIMAL(4,2) NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS rab_calculations (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(100),
      user_id INTEGER REFERENCES users(id),
      building_type VARCHAR(50) NOT NULL,
      area INTEGER NOT NULL,
      floors INTEGER NOT NULL,
      quality VARCHAR(20) NOT NULL,
      region VARCHAR(50) NOT NULL,
      total_cost BIGINT NOT NULL,
      price_per_m2 INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS rab_leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      phone VARCHAR(50),
      email VARCHAR(255),
      company VARCHAR(255),
      building_type VARCHAR(50),
      area INTEGER,
      floors INTEGER,
      quality VARCHAR(20),
      region VARCHAR(50),
      estimated_cost BIGINT,
      message TEXT,
      status VARCHAR(20) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}
