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

    // Seed projects
    const existingProjects = await sql`SELECT COUNT(*) as count FROM projects`;
    if (Number(existingProjects.rows[0].count) === 0) {
      await sql`INSERT INTO projects (title, title_en, client, category, sub_category, description, description_en, contract_number, location_name, latitude, longitude, start_date, end_date, progress, status, current_phase, image_url, scope, scope_en) VALUES
        ('Pembangunan Gedung Perkantoran Mega Tower', 'Mega Tower Office Building Construction', 'PT Mega Investama', 'building', 'Office', 'Pembangunan gedung perkantoran 15 lantai dengan fasilitas modern dan standar green building.', 'Construction of a 15-story office building with modern facilities and green building standards.', 'KBS/2024/001', 'Jakarta Selatan', -6.2615, 106.8106, '2024-01-15', NULL, 72, 'active', 'Struktur Lantai 11', '/images/proyek/1.jpg', 'Konstruksi struktur, MEP, finishing interior dan eksterior', 'Structural construction, MEP, interior and exterior finishing'),
        ('Renovasi Masjid Al-Ikhlas Bekasi', 'Al-Ikhlas Mosque Renovation Bekasi', 'Yayasan Al-Ikhlas', 'building', 'Religious', 'Renovasi dan perluasan masjid kapasitas 2000 jamaah dengan desain arsitektur islami modern.', 'Renovation and expansion of a mosque with 2000 worshiper capacity featuring modern Islamic architecture.', 'KBS/2024/002', 'Bekasi', -6.2383, 107.0000, '2024-03-01', '2024-11-30', 100, 'completed', 'Selesai', '/images/proyek/2.jpg', 'Pembongkaran, pondasi baru, struktur, finishing', 'Demolition, new foundation, structure, finishing'),
        ('Pembangunan Jalan Akses Kawasan Industri', 'Industrial Area Access Road Construction', 'PT Kawasan Industri Jababeka', 'infrastructure', 'Road', 'Pembangunan jalan akses 2.5 km dengan lebar 12 meter termasuk drainase dan penerangan.', 'Construction of 2.5 km access road with 12 meter width including drainage and lighting.', 'KBS/2024/003', 'Cikarang, Bekasi', -6.3105, 107.1468, '2024-02-10', NULL, 85, 'active', 'Pengaspalan Tahap 2', '/images/proyek/3.jpg', 'Land clearing, subgrade, subbase, hotmix, drainase', 'Land clearing, subgrade, subbase, hotmix, drainage'),
        ('Interior Kantor PT Sinar Abadi', 'PT Sinar Abadi Office Interior', 'PT Sinar Abadi', 'interior', 'Office', 'Desain dan pembangunan interior kantor 3 lantai dengan konsep modern minimalis.', 'Design and construction of 3-floor office interior with modern minimalist concept.', 'KBS/2024/004', 'Jakarta Timur', -6.2254, 106.9004, '2024-04-05', '2024-08-15', 100, 'completed', 'Selesai', '/images/proyek/4.jpg', 'Partisi, plafon, lantai, MEP, furniture custom', 'Partition, ceiling, flooring, MEP, custom furniture'),
        ('Pembangunan Gudang Logistik Modern', 'Modern Logistics Warehouse Construction', 'PT Logistik Nusantara', 'building', 'Warehouse', 'Pembangunan gudang logistik 5000 m2 dengan sistem rak otomatis dan loading dock.', 'Construction of 5000 sqm logistics warehouse with automated racking system and loading dock.', 'KBS/2024/005', 'Tangerang', -6.1784, 106.6319, '2024-05-20', NULL, 55, 'active', 'Pemasangan Atap', '/images/proyek/5.jpg', 'Pondasi, struktur baja, dinding panel, atap, floor hardener', 'Foundation, steel structure, panel walls, roof, floor hardener'),
        ('Rehabilitasi Jembatan Kali Bekasi', 'Kali Bekasi Bridge Rehabilitation', 'Dinas PU Kota Bekasi', 'infrastructure', 'Bridge', 'Rehabilitasi dan pelebaran jembatan sepanjang 45 meter dengan kapasitas beban kelas A.', 'Rehabilitation and widening of 45 meter bridge with class A load capacity.', 'KBS/2024/006', 'Bekasi Utara', -6.1990, 106.9815, '2024-06-01', NULL, 40, 'active', 'Perkuatan Abutment', '/images/proyek/6.jpg', 'Pembongkaran, perkuatan pondasi, girder baru, deck slab', 'Demolition, foundation reinforcement, new girder, deck slab'),
        ('Perumahan Green Residence Depok', 'Green Residence Depok Housing', 'PT Graha Residence', 'building', 'Residential', 'Pembangunan cluster perumahan 50 unit type 45-72 dengan konsep green living.', 'Construction of 50-unit housing cluster type 45-72 with green living concept.', 'KBS/2024/007', 'Depok', -6.3920, 106.8224, '2024-01-20', NULL, 68, 'active', 'Finishing Unit 30-40', '/images/proyek/7.jpg', 'Infrastruktur, pondasi, struktur, finishing per unit', 'Infrastructure, foundation, structure, finishing per unit'),
        ('Pembangunan Ruko 3 Lantai Bogor', '3-Story Shophouse Construction Bogor', 'PT Mitra Sejahtera', 'building', 'Shophouse', 'Pembangunan 12 unit ruko 3 lantai di kawasan komersial strategis.', 'Construction of 12 units of 3-story shophouse in strategic commercial area.', 'KBS/2024/008', 'Bogor', -6.5950, 106.8166, '2024-03-15', '2024-12-20', 100, 'completed', 'Selesai', '/images/proyek/8.jpg', 'Pondasi bore pile, struktur beton, finishing, site development', 'Bore pile foundation, concrete structure, finishing, site development'),
        ('Sistem Drainase Kawasan Cakung', 'Cakung Area Drainage System', 'Dinas SDA DKI Jakarta', 'infrastructure', 'Drainage', 'Pembangunan sistem drainase sepanjang 3.2 km untuk mengatasi banjir di kawasan Cakung.', 'Construction of 3.2 km drainage system to address flooding in Cakung area.', 'KBS/2024/009', 'Jakarta Timur', -6.1857, 106.9370, '2024-07-01', NULL, 30, 'active', 'Galian Saluran Primer', '/images/proyek/9.jpg', 'Galian, box culvert, saluran terbuka, gorong-gorong', 'Excavation, box culvert, open channel, culvert pipes'),
        ('Renovasi Hotel Bintang 3 Puncak', '3-Star Hotel Renovation Puncak', 'PT Hospitality Group', 'building', 'Hotel', 'Renovasi total hotel 80 kamar termasuk lobby, restoran, dan area outdoor.', 'Total renovation of 80-room hotel including lobby, restaurant, and outdoor area.', 'KBS/2024/010', 'Puncak, Bogor', -6.6930, 106.9940, '2024-04-10', NULL, 62, 'active', 'Finishing Kamar Lt.3', '/images/proyek/10.jpg', 'Pembongkaran, struktur tambahan, MEP upgrade, finishing', 'Demolition, additional structure, MEP upgrade, finishing'),
        ('Pembangunan Pabrik Kemasan Cikarang', 'Packaging Factory Construction Cikarang', 'PT Indo Packaging', 'building', 'Factory', 'Pembangunan pabrik kemasan 3000 m2 dengan standar GMP dan ruang produksi bersih.', 'Construction of 3000 sqm packaging factory with GMP standards and clean production room.', 'KBS/2024/011', 'Cikarang Selatan', -6.3500, 107.1700, '2024-08-01', NULL, 25, 'active', 'Pondasi & Struktur', '/images/proyek/11.jpg', 'Site prep, pondasi, struktur baja, MEP, clean room', 'Site prep, foundation, steel structure, MEP, clean room'),
        ('Penataan Kawasan Pedestrian BSD', 'BSD Pedestrian Area Development', 'PT BSD City', 'infrastructure', 'Pedestrian', 'Penataan kawasan pedestrian sepanjang 1.8 km dengan taman dan street furniture.', 'Development of 1.8 km pedestrian area with gardens and street furniture.', 'KBS/2024/012', 'BSD, Tangerang Selatan', -6.3016, 106.6522, '2024-05-15', '2024-10-30', 100, 'completed', 'Selesai', '/images/proyek/12.jpg', 'Paving, taman, lampu, bangku, signage, landscaping', 'Paving, garden, lighting, benches, signage, landscaping'),
        ('Pembangunan Tower Apartemen 20 Lantai', '20-Story Apartment Tower Construction', 'PT Properti Nusantara', 'building', 'Apartment', 'Pembangunan tower apartemen 20 lantai dengan 200 unit hunian dan fasilitas lengkap.', 'Construction of 20-story apartment tower with 200 residential units and full facilities.', 'KBS/2024/013', 'Jakarta Barat', -6.1686, 106.7589, '2023-06-01', NULL, 88, 'active', 'Finishing Interior Lt.18-20', '/images/proyek/13.jpg', 'Pondasi tiang pancang, struktur beton, MEP, finishing, landscape', 'Pile foundation, concrete structure, MEP, finishing, landscape'),
        ('Renovasi Gedung Sekolah Negeri', 'Public School Building Renovation', 'Dinas Pendidikan Kota Depok', 'rehabilitation', 'Education', 'Rehabilitasi dan peningkatan 3 gedung sekolah termasuk lab dan perpustakaan.', 'Rehabilitation and upgrade of 3 school buildings including lab and library.', 'KBS/2024/014', 'Depok', -6.4025, 106.7942, '2024-06-15', '2024-11-30', 100, 'completed', 'Selesai', '/images/proyek/14.jpg', 'Perkuatan struktur, renovasi ruang kelas, lab baru', 'Structural reinforcement, classroom renovation, new lab'),
        ('Land Development Kawasan Industri Karawang', 'Karawang Industrial Area Land Development', 'PT Karawang Industrial City', 'land_development', 'Industrial', 'Pengembangan lahan 15 hektar untuk kawasan industri termasuk jalan, utilitas, dan saluran.', 'Development of 15 hectare land for industrial area including roads, utilities, and channels.', 'KBS/2024/015', 'Karawang', -6.3227, 107.3376, '2024-02-01', NULL, 45, 'active', 'Konstruksi Jalan Internal', '/images/proyek/15.jpg', 'Cut and fill, jalan, drainase, utilitas, gate', 'Cut and fill, roads, drainage, utilities, gate'),
        ('Pembangunan Dermaga Muara Angke', 'Muara Angke Dock Construction', 'Dinas Perhubungan DKI Jakarta', 'infrastructure', 'Marine', 'Pembangunan dermaga baru sepanjang 120 meter untuk kapal nelayan dan wisata.', 'Construction of new 120 meter dock for fishing boats and tourism.', 'KBS/2024/016', 'Jakarta Utara', -6.1028, 106.7378, '2024-09-01', NULL, 15, 'active', 'Pemancangan Tiang', '/images/proyek/16.jpg', 'Tiang pancang baja, deck beton, bollard, fender', 'Steel pile, concrete deck, bollard, fender'),
        ('Renovasi Pasar Tradisional Cibinong', 'Cibinong Traditional Market Renovation', 'Pemkab Bogor', 'rehabilitation', 'Market', 'Revitalisasi pasar tradisional 2 lantai dengan 300 kios dan area parkir modern.', 'Revitalization of 2-story traditional market with 300 stalls and modern parking area.', 'KBS/2024/017', 'Cibinong, Bogor', -6.4810, 106.8514, '2024-07-15', NULL, 35, 'active', 'Struktur Lantai 2', '/images/proyek/17.jpg', 'Pembongkaran parsial, pondasi baru, struktur, MEP, finishing', 'Partial demolition, new foundation, structure, MEP, finishing'),
        ('Pembangunan Water Treatment Plant', 'Water Treatment Plant Construction', 'PDAM Tirta Bhagasasi', 'infrastructure', 'Water', 'Pembangunan instalasi pengolahan air bersih kapasitas 100 liter/detik.', 'Construction of clean water treatment plant with 100 liter/second capacity.', 'KBS/2024/018', 'Bekasi Selatan', -6.2700, 107.0200, '2024-08-15', NULL, 20, 'active', 'Konstruksi Bak Sedimentasi', '/images/proyek/18.jpg', 'Intake, sedimentasi, filtrasi, reservoir, distribusi', 'Intake, sedimentation, filtration, reservoir, distribution')
      `;
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      tables: ['users', 'equipment', 'bookings', 'materials', 'material_orders', 'rab_pricing', 'rab_quality', 'rab_regional_index', 'rab_calculations', 'rab_leads', 'projects', 'project_updates', 'project_team'],
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
