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
}
