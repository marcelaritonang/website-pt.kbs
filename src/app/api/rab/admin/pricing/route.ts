import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { getTokenFromHeader } from '@/lib/auth';

// Verify admin role
async function verifyAdmin(request: Request): Promise<{ id: number; email: string; name: string } | null> {
  const authHeader = request.headers.get('authorization');
  const user = getTokenFromHeader(authHeader);
  if (!user) return null;

  if (!hasDatabase) return null;

  const result = await sql`SELECT role FROM users WHERE id = ${user.id}`;
  if (result.rows.length === 0 || result.rows[0].role !== 'admin') return null;

  return user;
}

// GET /api/rab/admin/pricing - Get all pricing data for admin panel
export async function GET(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [pricing, quality, regional] = await Promise.all([
      sql`SELECT * FROM rab_pricing ORDER BY building_type`,
      sql`SELECT * FROM rab_quality ORDER BY multiplier ASC`,
      sql`SELECT * FROM rab_regional_index ORDER BY region`,
    ]);

    return NextResponse.json({
      pricing: pricing.rows,
      quality: quality.rows,
      regional: regional.rows,
    });
  } catch (error) {
    console.error('Admin pricing fetch error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT /api/rab/admin/pricing - Update pricing data
export async function PUT(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'base_price') {
      // Update base price for a building type
      const { buildingType, price } = data;
      if (!buildingType || !price || price < 1000000 || price > 50000000) {
        return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
      }

      await sql`
        INSERT INTO rab_pricing (building_type, base_price_per_m2, updated_at)
        VALUES (${buildingType}, ${price}, NOW())
        ON CONFLICT (building_type) DO UPDATE SET
          base_price_per_m2 = ${price},
          updated_at = NOW()
      `;
    } else if (type === 'quality') {
      // Update quality multiplier
      const { quality, multiplier } = data;
      if (!quality || !multiplier || multiplier < 0.5 || multiplier > 5.0) {
        return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
      }

      await sql`
        INSERT INTO rab_quality (quality, multiplier, updated_at)
        VALUES (${quality}, ${multiplier}, NOW())
        ON CONFLICT (quality) DO UPDATE SET
          multiplier = ${multiplier},
          updated_at = NOW()
      `;
    } else if (type === 'regional') {
      // Update regional multiplier
      const { region, regionLabel, multiplier } = data;
      if (!region || !multiplier || multiplier < 0.5 || multiplier > 3.0) {
        return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
      }

      await sql`
        INSERT INTO rab_regional_index (region, region_label, multiplier, updated_at)
        VALUES (${region}, ${regionLabel || region}, ${multiplier}, NOW())
        ON CONFLICT (region) DO UPDATE SET
          region_label = ${regionLabel || region},
          multiplier = ${multiplier},
          updated_at = NOW()
      `;
    } else {
      return NextResponse.json({ error: 'Tipe update tidak dikenali' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Berhasil diupdate', success: true });
  } catch (error) {
    console.error('Admin pricing update error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate data' }, { status: 500 });
  }
}
