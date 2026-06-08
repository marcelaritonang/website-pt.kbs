import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { initDatabase } from '@/lib/db';

export async function GET(request: Request) {
  // Block in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  // Require a secret seed key for extra protection
  const url = new URL(request.url);
  const seedKey = url.searchParams.get('key');
  if (seedKey !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Create tables
    await initDatabase();

    // Seed equipment
    const existingEquipment = await sql`SELECT COUNT(*) as count FROM equipment`;
    if (Number(existingEquipment.rows[0].count) === 0) {
      await sql`INSERT INTO equipment (name, category, price_per_day, specs, location, available, image, rating, reviews) VALUES
        ('Excavator CAT 320D', 'excavator', 2500000, '{"weight":"20 ton","capacity":"0.9 m³","reach":"9.9 m"}', 'Jakarta Timur', true, '/images/equipment/excavator-1.jpg', 4.8, 24),
        ('Dump Truck Hino 500', 'dump-truck', 1800000, '{"weight":"15 ton","capacity":"10 m³","engine":"260 HP"}', 'Bekasi', true, '/images/equipment/dump-truck-1.jpg', 4.6, 38),
        ('Mobile Crane 25 Ton', 'crane', 5500000, '{"capacity":"25 ton","boom":"33 m","type":"Hydraulic"}', 'Tangerang', true, '/images/equipment/crane-1.jpg', 4.9, 15),
        ('Bulldozer Komatsu D65', 'bulldozer', 3200000, '{"weight":"17.5 ton","blade":"3.9 m","engine":"205 HP"}', 'Bogor', false, '/images/equipment/bulldozer-1.jpg', 4.7, 19),
        ('Vibro Roller Bomag', 'roller', 1500000, '{"weight":"12 ton","width":"2.1 m","type":"Tandem"}', 'Depok', true, '/images/equipment/roller-1.jpg', 4.5, 12),
        ('Excavator Komatsu PC200', 'excavator', 2800000, '{"weight":"22 ton","capacity":"1.0 m³","reach":"10.2 m"}', 'Jakarta Selatan', true, '/images/equipment/excavator-2.jpg', 4.8, 31)
      `;
    }

    // Seed materials
    const existingMaterials = await sql`SELECT COUNT(*) as count FROM materials`;
    if (Number(existingMaterials.rows[0].count) === 0) {
      await sql`INSERT INTO materials (name, category, brand, price, unit, stock, image, rating, sold) VALUES
        ('Semen Portland Tipe I (50kg)', 'semen', 'Tiga Roda', 72000, '/sak', 500, '/images/materials/semen-1.jpg', 4.8, 1240),
        ('Besi Beton Polos 10mm (12m)', 'besi', 'Krakatau Steel', 95000, '/batang', 350, '/images/materials/besi-1.jpg', 4.7, 890),
        ('Pasir Bangka Halus', 'pasir', 'Supplier Lokal', 450000, '/m³', 200, '/images/materials/pasir-1.jpg', 4.5, 560),
        ('Kayu Meranti 6x12 (4m)', 'kayu', 'Borneo Wood', 185000, '/batang', 150, '/images/materials/kayu-1.jpg', 4.6, 320),
        ('Cat Tembok Interior (5kg)', 'cat', 'Dulux', 165000, '/pail', 400, '/images/materials/cat-1.jpg', 4.9, 780),
        ('Semen PCC (40kg)', 'semen', 'Holcim', 62000, '/sak', 600, '/images/materials/semen-2.jpg', 4.7, 950),
        ('Batu Split 2-3cm', 'pasir', 'Supplier Lokal', 380000, '/m³', 100, '/images/materials/batu-1.jpg', 4.4, 430),
        ('Besi Wiremesh M8 (2.1x5.4m)', 'besi', 'Gunung Garuda', 320000, '/lembar', 80, '/images/materials/besi-2.jpg', 4.8, 210)
      `;
    }

    // Seed admin user
    const existingAdmin = await sql`SELECT COUNT(*) as count FROM users WHERE email = 'rianco@karyabangunsemesta.my.id'`;
    if (Number(existingAdmin.rows[0].count) === 0) {
      const hashedPassword = await bcrypt.hash('kbs123', 10);
      await sql`
        INSERT INTO users (name, email, password_hash, company, phone, role)
        VALUES ('Rianco', 'rianco@karyabangunsemesta.my.id', ${hashedPassword}, 'PT Karya Bangun Semesta', '', 'admin')
      `;
    } else {
      // Ensure existing user has admin role
      await sql`UPDATE users SET role = 'admin' WHERE email = 'rianco@karyabangunsemesta.my.id'`;
    }

    // Seed RAB pricing data
    const existingRABPricing = await sql`SELECT COUNT(*) as count FROM rab_pricing`;
    if (Number(existingRABPricing.rows[0].count) === 0) {
      await sql`INSERT INTO rab_pricing (building_type, base_price_per_m2) VALUES
        ('rumah', 4200000),
        ('ruko', 4800000),
        ('gudang', 3500000),
        ('kantor', 5800000),
        ('workshop', 3800000)
      `;
      await sql`INSERT INTO rab_quality (quality, multiplier, description_id, description_en) VALUES
        ('standar', 1.00, 'Bata merah, keramik 40x40, kusen kayu, cat ekonomi', 'Red brick, 40x40 tiles, wood frames, economy paint'),
        ('menengah', 1.45, 'Hebel, keramik 60x60, kusen aluminium, cat Dulux', 'AAC block, 60x60 tiles, aluminum frames, Dulux paint'),
        ('premium', 2.10, 'Hebel + panel, granit/marmer, kusen UPVC, custom design', 'AAC + panel, granite/marble, UPVC frames, custom design')
      `;
      await sql`INSERT INTO rab_regional_index (region, region_label, multiplier) VALUES
        ('jakarta', 'Jakarta', 1.20),
        ('bogor', 'Bogor', 1.00),
        ('depok', 'Depok', 1.05),
        ('tangerang', 'Tangerang', 1.08),
        ('bekasi', 'Bekasi', 1.05),
        ('bandung', 'Bandung', 0.92),
        ('surabaya', 'Surabaya', 0.98),
        ('semarang', 'Semarang', 0.88),
        ('yogyakarta', 'Yogyakarta', 0.85),
        ('medan', 'Medan', 0.95)
      `;
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      tables: ['users', 'equipment', 'bookings', 'materials', 'material_orders', 'rab_pricing', 'rab_quality', 'rab_regional_index', 'rab_calculations', 'rab_leads'],
      admin: 'rianco@karyabangunsemesta.my.id (role: admin)'
    });

  } catch (error: unknown) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Database operation failed' },
      { status: 500 }
    );
  }
}
