import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { getTokenFromHeader } from '@/lib/auth';

async function verifyAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  const user = getTokenFromHeader(authHeader);
  if (!user || !hasDatabase) return null;

  const result = await sql`SELECT role FROM users WHERE id = ${user.id}`;
  if (result.rows.length === 0 || result.rows[0].role !== 'admin') return null;
  return user;
}

// GET /api/rab/admin/analytics - Get calculation statistics
export async function GET(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Total calculations
    const totalCalc = await sql`SELECT COUNT(*) as total FROM rab_calculations`;

    // Calculations by building type
    const byType = await sql`
      SELECT building_type, COUNT(*) as count
      FROM rab_calculations
      GROUP BY building_type
      ORDER BY count DESC
    `;

    // Calculations by region
    const byRegion = await sql`
      SELECT region, COUNT(*) as count
      FROM rab_calculations
      GROUP BY region
      ORDER BY count DESC
    `;

    // Calculations by quality
    const byQuality = await sql`
      SELECT quality, COUNT(*) as count
      FROM rab_calculations
      GROUP BY quality
      ORDER BY count DESC
    `;

    // Average area per type
    const avgArea = await sql`
      SELECT building_type, ROUND(AVG(area)) as avg_area, ROUND(AVG(total_cost)) as avg_cost
      FROM rab_calculations
      GROUP BY building_type
      ORDER BY avg_cost DESC
    `;

    // Daily calculations (last 30 days)
    const daily = await sql`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM rab_calculations
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    // Total leads
    const totalLeads = await sql`SELECT COUNT(*) as total FROM rab_leads`;
    const newLeads = await sql`SELECT COUNT(*) as total FROM rab_leads WHERE status = 'new'`;

    return NextResponse.json({
      summary: {
        totalCalculations: parseInt(totalCalc.rows[0].total),
        totalLeads: parseInt(totalLeads.rows[0].total),
        newLeads: parseInt(newLeads.rows[0].total),
      },
      byType: byType.rows,
      byRegion: byRegion.rows,
      byQuality: byQuality.rows,
      avgArea: avgArea.rows,
      daily: daily.rows,
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data analytics' }, { status: 500 });
  }
}
