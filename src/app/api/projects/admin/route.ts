import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('kbs_token')?.value;
  if (!token) return null;
  const user = verifyToken(token);
  if (!user) return null;

  if (!hasDatabase) return null;
  const result = await sql`SELECT role FROM users WHERE id = ${user.id}`;
  if (result.rows.length === 0 || result.rows[0].role !== 'admin') return null;
  return user;
}

// GET /api/projects/admin - List all projects (admin)
export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await sql`
      SELECT p.*,
        (SELECT COUNT(*) FROM project_updates WHERE project_id = p.id) as update_count,
        (SELECT COUNT(*) FROM project_team WHERE project_id = p.id) as team_count
      FROM projects p
      ORDER BY p.updated_at DESC
    `;

    return NextResponse.json({ projects: result.rows });
  } catch (error) {
    console.error('Admin get projects error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/projects/admin - Create project
export async function POST(request: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title, titleEn, client, category, subCategory,
      description, descriptionEn, contractNumber,
      locationName, latitude, longitude,
      startDate, endDate, estimatedEndDate,
      progress, status, currentPhase, budget, imageUrl,
      scope, scopeEn,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO projects (
        title, title_en, client, category, sub_category,
        description, description_en, contract_number,
        location_name, latitude, longitude,
        start_date, end_date, estimated_end_date,
        progress, status, current_phase, budget, image_url,
        scope, scope_en
      ) VALUES (
        ${title}, ${titleEn || null}, ${client || null}, ${category || null}, ${subCategory || null},
        ${description || null}, ${descriptionEn || null}, ${contractNumber || null},
        ${locationName || null}, ${latitude || null}, ${longitude || null},
        ${startDate || null}, ${endDate || null}, ${estimatedEndDate || null},
        ${progress || 0}, ${status || 'planning'}, ${currentPhase || null}, ${budget || null}, ${imageUrl || null},
        ${scope || null}, ${scopeEn || null}
      )
      RETURNING id
    `;

    return NextResponse.json({ id: result.rows[0].id, message: 'Project created' });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
