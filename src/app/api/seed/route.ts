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

    // Seed projects - 3 active (dummy), completed from real KBS portfolio
    await sql`DELETE FROM project_updates`;
    await sql`DELETE FROM project_team`;
    await sql`DELETE FROM projects`;

    await sql`INSERT INTO projects (title, title_en, client, category, sub_category, description, description_en, contract_number, location_name, latitude, longitude, start_date, end_date, progress, status, current_phase, image_url, scope, scope_en) VALUES
      ('Renovasi Rumah Tinggal Bpk. Hendra', 'Mr. Hendra Residential Renovation', 'Bpk. Hendra Wijaya', 'building', 'Residential', 'Renovasi rumah tinggal 2 lantai type 120 meliputi perbaikan atap bocor, pengecatan ulang, dan perluasan dapur belakang.', 'Renovation of 2-story type 120 residential house including roof leak repair, repainting, and kitchen extension.', 'KBS/2025/001', 'Bekasi Timur', -6.2480, 107.0180, '2025-04-10', NULL, 65, 'active', 'Pengecatan & Finishing', NULL, 'Pembongkaran atap lama, pasang rangka baja ringan, perluasan dapur 3x4m, pengecatan seluruh rumah', 'Old roof demolition, light steel frame installation, 3x4m kitchen extension, full house repainting'),
      ('Pembangunan Rumah Type 45 Cluster Cibubur', 'Type 45 House Construction Cibubur Cluster', 'Ibu Ratna Sari', 'building', 'Residential', 'Pembangunan rumah tinggal baru type 45 di lahan 72m2 dengan 2 kamar tidur, 1 kamar mandi, carport, dan taman kecil.', 'New construction of type 45 house on 72sqm land with 2 bedrooms, 1 bathroom, carport, and small garden.', 'KBS/2025/002', 'Cibubur, Jakarta Timur', -6.3680, 106.8840, '2025-03-15', NULL, 40, 'active', 'Pemasangan Dinding & Kusen', NULL, 'Pondasi cakar ayam, struktur beton, dinding bata ringan, atap baja ringan, instalasi listrik & plumbing', 'Chicken claw foundation, concrete structure, lightweight brick walls, light steel roof, electrical & plumbing installation'),
      ('Renovasi Fasad Ruko Jl. Raya Bogor', 'Shophouse Facade Renovation Jl. Raya Bogor', 'Bpk. Andi Setiawan', 'building', 'Shophouse', 'Renovasi tampak depan ruko 2 lantai termasuk pemasangan ACP, kanopi kaca, dan rolling door baru.', 'Renovation of 2-story shophouse facade including ACP installation, glass canopy, and new rolling door.', 'KBS/2025/003', 'Kramat Jati, Jakarta Timur', -6.2750, 106.8680, '2025-05-20', NULL, 25, 'active', 'Pemasangan ACP', NULL, 'Pembongkaran fasad lama, rangka besi hollow, pemasangan ACP, kanopi kaca tempered, rolling door galvanis', 'Old facade demolition, hollow iron frame, ACP installation, tempered glass canopy, galvanized rolling door'),
      ('Pekerjaan Cut & Fill, Jalan dan Saluran, Rumah Bertipe', 'Cut & Fill, Road and Channel Works, Typical Houses', 'PT. Anugerah Griya Lestari', 'building', 'Konstruksi Sipil & ME', 'Proyek konstruksi perumahan yang mencakup pekerjaan cut & fill, pembangunan jalan dan saluran, serta konstruksi rumah bertipe.', 'Housing construction project including cut & fill work, road and channel construction, and typical house construction.', '22/DH/AGL/9/08', 'Semarang', -6.9666, 110.4196, '2014-08-09', '2015-06-30', 100, 'completed', 'Selesai', '/images/proyek/1.jpg', 'Konstruksi', 'Construction'),
      ('Proyek Banjir Kanal Timur Paket 30', 'East Flood Canal Project Package 30', 'PT. Jaya Konstruksi MP, TBK', 'infrastructure', 'Pekerjaan Batu', 'Proyek pengendalian banjir melalui pembangunan Banjir Kanal Timur paket 30 di area Bekasi.', 'Flood control project through the construction of the East Flood Canal package 30 in the Bekasi area.', '11/15/2001', 'Bekasi', -6.2483, 107.0000, '2001-05-15', '2002-12-30', 100, 'completed', 'Selesai', '/images/proyek/2.jpg', 'Pekerjaan Batu', 'Stone Works'),
      ('Normalisasi Kali Pesanggrahan Paket 3', 'Pesanggrahan River Normalization Package 3', 'PT. Pembangunan Perumahan (Persero)', 'infrastructure', 'Pekerjaan Tanah', 'Proyek normalisasi Kali Pesanggrahan untuk mengatasi masalah banjir di Jakarta.', 'Pesanggrahan River normalization project to address flooding issues in Jakarta.', '1/25/2012', 'Jakarta', -6.2088, 106.8456, '2012-01-25', '2013-04-30', 100, 'completed', 'Selesai', '/images/proyek/3.jpg', 'Pengerukan Lumpur', 'Mud Dredging'),
      ('Pembangunan Pengamanan Pantai di Jakarta', 'Jakarta Coastal Protection Construction', 'BBWS Ciliwung - Cisadane', 'waterStructure', 'Pekerjaan Bangunan Air', 'Proyek pembangunan struktur pengamanan pantai untuk melindungi area pesisir Jakarta dari abrasi.', 'Coastal protection structure construction to protect Jakarta coastal areas from abrasion.', 'HK.02.03/PPK.SP-LSRWT PSA-CCS/V/17', 'Jakarta', -6.1028, 106.7378, '2014-06-30', '2015-12-15', 100, 'completed', 'Selesai', '/images/proyek/5.jpg', 'Pemancangan', 'Piling'),
      ('Rehabilitasi Jalan dan Jembatan Cipanas - Warung Banten', 'Cipanas - Warung Banten Road and Bridge Rehabilitation', 'PT. Jaya Konstruksi MP, TBK', 'rehabilitation', 'Rehabilitasi Jalan', 'Proyek rehabilitasi jalan dan jembatan pada ruas Cipanas-Warung Banten.', 'Road and bridge rehabilitation on the Cipanas-Warung Banten section.', 'JKN/SPK/2021/011', 'Banten', -6.1180, 106.0640, '2021-08-30', '2022-06-15', 100, 'completed', 'Selesai', '/images/proyek/8.jpg', 'Timbunan', 'Embankment'),
      ('Pekerjaan Reflected Pond Lobby Grand Hyatt', 'Grand Hyatt Lobby Reflected Pond Works', 'PT. Plaza Indonesia Realty TBK', 'interior', 'Interior', 'Pekerjaan reflected pond untuk area lobby hotel Grand Hyatt Jakarta dengan konsep desain modern.', 'Reflected pond works for Grand Hyatt Jakarta hotel lobby area with modern design concept.', 'GH/PE/G/04', 'Jakarta', -6.1944, 106.8229, '2021-04-11', '2021-09-30', 100, 'completed', 'Selesai', '/images/proyek/grandhyatt-rev.jpeg', 'Interior Lobby', 'Lobby Interior'),
      ('Interior & Furniture Club House Zora BSD City', 'Zora BSD City Club House Interior & Furniture', 'PT. Multi Bangun Persada', 'interior', 'Interior', 'Pekerjaan interior dan furniture untuk club house di kawasan perumahan Zora BSD City.', 'Interior and furniture works for the club house in the Zora BSD City residential area.', '79/MBP-KBS/CH/2/2021', 'Tangerang', -6.3016, 106.6522, '2021-02-22', '2021-08-15', 100, 'completed', 'Selesai', '/images/proyek/10.jpg', 'Interior', 'Interior'),
      ('Pembangunan Sekolah dan Mushola WAMY', 'WAMY School and Prayer Room Construction', 'World Assembly Muslim Youth (WAMY)', 'building', 'Konstruksi Bangunan Gedung', 'Proyek pembangunan fasilitas sekolah dan mushola di kawasan Parung, Bogor.', 'School and prayer room facility construction in Parung, Bogor for WAMY organization.', 'WAM/Y36/KBS/PSM/1/2021', 'Parung, Bogor', -6.4200, 106.7300, '2021-01-25', '2021-11-30', 100, 'completed', 'Selesai', '/images/proyek/11.jpg', 'Bangunan Gedung', 'Building'),
      ('Pembangunan Condotel HAPPER Ciawi Tower A, B, C', 'HAPPER Ciawi Condotel Tower A, B, C Construction', 'PT. Lingga Dewata Agung', 'building', 'Konstruksi Bangunan Gedung', 'Proyek pembangunan condotel yang terdiri dari 3 tower di kawasan Ciawi, Bogor.', 'Condotel construction project consisting of 3 towers in Ciawi, Bogor.', '0501-KONTRAK-CH-CLDA-JAP-2022', 'Ciawi, Bogor', -6.6710, 106.8670, '2022-07-20', '2024-03-30', 100, 'completed', 'Selesai', '/images/proyek/14.jpg', 'Bangunan Gedung', 'Building'),
      ('Infrastruktur Kawasan OPD Kabupaten Karawang', 'Karawang Regency OPD Area Infrastructure', 'PT. Trincanala Sakti Utama', 'infrastructure', 'Konstruksi Bangunan Umum', 'Proyek pembangunan infrastruktur kawasan OPD di Kabupaten Karawang.', 'Infrastructure development for the OPD area in Karawang Regency.', 'OPD/26/TSU/KBS/IV/20', 'Karawang', -6.3227, 107.3376, '2020-04-06', '2021-02-28', 100, 'completed', 'Selesai', '/images/proyek/17.jpg', 'Infrastruktur', 'Infrastructure'),
      ('Cut & Fill, Land Clearing, Drainase & Jalan Utama Kawasan Industri Subang', 'Subang Industrial Estate Cut & Fill, Land Clearing, Drainage & Main Road', 'PT. Nusa Raya Cipta', 'infrastructure', 'Infrastruktur dan Pematangan Lahan', 'Proyek pengembangan infrastruktur kawasan industri di Subang meliputi cut & fill, land clearing, drainase, dan jalan utama.', 'Industrial estate infrastructure in Subang including cut & fill, land clearing, drainage and main road.', '063-KONTRAK-KIS-NRC-KBS 2022', 'Kalijati, Subang', -6.5500, 107.6500, '2022-05-13', '2023-08-30', 100, 'completed', 'Selesai', '/images/proyek/18.jpg', 'Pengerjaan Lahan', 'Land Works')
    `;

    // Add project updates for active projects
    const allProjects = await sql`SELECT id, status FROM projects ORDER BY id ASC`;
    const activeProjects = allProjects.rows.filter(p => p.status === 'active');

    // Get admin user id
    const adminUser = await sql`SELECT id FROM users WHERE email = 'rianco@karyabangunsemesta.my.id'`;
    const adminId = adminUser.rows[0]?.id || 1;

    // Assign admin to ALL projects so they show in dashboard
    for (const project of allProjects.rows) {
      await sql`INSERT INTO project_team (project_id, user_id, role) VALUES (${project.id}, ${adminId}, 'project_manager')`;
    }

    if (activeProjects.length >= 3) {
      const p1 = activeProjects[0].id;
      const p2 = activeProjects[1].id;
      const p3 = activeProjects[2].id;

      await sql`INSERT INTO project_updates (project_id, title, description, progress_after, photos, updated_by, created_at) VALUES
        (${p1}, 'Pembongkaran atap lama selesai', 'Rangka kayu dan genteng lama sudah dibongkar seluruhnya. Kondisi ring balok masih bagus, tidak perlu perkuatan tambahan.', 20, NULL, ${adminId}, '2025-04-18'),
        (${p1}, 'Pemasangan rangka baja ringan', 'Rangka atap baja ringan canal C75 sudah terpasang. Genteng metal dipasang minggu depan.', 35, NULL, ${adminId}, '2025-04-28'),
        (${p1}, 'Atap selesai, mulai perluasan dapur', 'Genteng metal sudah terpasang, talang air dipasang. Mulai cor lantai perluasan dapur 3x4m.', 45, NULL, ${adminId}, '2025-05-08'),
        (${p1}, 'Dinding dapur baru selesai', 'Dinding bata ringan perluasan dapur sudah diplester dan diaci. Kusen aluminium sudah terpasang.', 55, NULL, ${adminId}, '2025-05-20'),
        (${p1}, 'Mulai pengecatan', 'Pengecatan dimulai dari bagian dalam. Cat dasar sudah selesai untuk 6 ruangan. Minggu depan cat finishing.', 65, NULL, ${adminId}, '2025-06-02'),
        (${p2}, 'Pondasi selesai', 'Galian pondasi cakar ayam selesai. Cor pondasi dan sloof sudah dilakukan. Menunggu kering 7 hari.', 15, NULL, ${adminId}, '2025-03-28'),
        (${p2}, 'Kolom dan dinding lantai 1', 'Pengecoran kolom selesai. Pemasangan dinding bata ringan sudah 60% untuk lantai 1.', 30, NULL, ${adminId}, '2025-04-15'),
        (${p2}, 'Pemasangan kusen dan ring balok', 'Kusen aluminium sudah terpasang semua. Ring balok dicor hari ini.', 40, NULL, ${adminId}, '2025-05-01'),
        (${p3}, 'Pembongkaran fasad lama', 'Plester dan keramik fasad lama sudah dibongkar. Dinding asli masih dalam kondisi baik.', 10, NULL, ${adminId}, '2025-05-28'),
        (${p3}, 'Rangka besi hollow terpasang', 'Rangka besi hollow 4x4 untuk dudukan ACP sudah terpasang dan dilas. Mulai ukur ACP.', 25, NULL, ${adminId}, '2025-06-05')
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
