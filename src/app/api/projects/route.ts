import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';

// GET /api/projects - Public project list
export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const status = url.searchParams.get('status');
  const limit = parseInt(url.searchParams.get('limit') || '50');

  if (!hasDatabase) {
    return NextResponse.json({ projects: [], total: 0 });
  }

  try {
    let query = `
      SELECT id, title, title_en, client, category, sub_category,
             description, description_en, location_name,
             latitude, longitude, start_date, end_date,
             estimated_end_date, progress, status, current_phase,
             budget, image_url, scope, scope_en, created_at
      FROM projects
      WHERE 1=1
    `;
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND category = $${paramIndex++}`;
      params.push(category);
    }
    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex}`;
    params.push(limit);

    const result = await sql.query(query, params);

    const countResult = await sql`SELECT COUNT(*) as total FROM projects`;
    const total = parseInt(countResult.rows[0].total);

    return NextResponse.json({
      projects: result.rows,
      total,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ projects: [], total: 0 });
  }
}
