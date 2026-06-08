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

// GET /api/projects/admin/[id]/updates - Get updates for a project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await sql`
      SELECT pu.*, u.name as updater_name
      FROM project_updates pu
      LEFT JOIN users u ON pu.updated_by = u.id
      WHERE pu.project_id = ${parseInt(id)}
      ORDER BY pu.created_at DESC
    `;

    return NextResponse.json({ updates: result.rows });
  } catch (error) {
    console.error('Get updates error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/projects/admin/[id]/updates - Add progress update
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const projectId = parseInt(id);

  try {
    const body = await request.json();
    const { title, description, progressAfter, photos } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 });
    }

    // Insert update
    await sql`
      INSERT INTO project_updates (project_id, title, description, progress_after, photos, updated_by)
      VALUES (${projectId}, ${title}, ${description || null}, ${progressAfter || null}, ${photos || null}, ${admin.id})
    `;

    // Update project progress if provided
    if (progressAfter !== undefined && progressAfter !== null) {
      await sql`
        UPDATE projects
        SET progress = ${progressAfter}, updated_at = NOW()
        WHERE id = ${projectId}
      `;

      // Auto-set status based on progress
      if (progressAfter >= 100) {
        await sql`UPDATE projects SET status = 'completed', end_date = NOW() WHERE id = ${projectId}`;
      } else if (progressAfter > 0) {
        await sql`UPDATE projects SET status = 'active' WHERE id = ${projectId} AND status = 'planning'`;
      }
    }

    return NextResponse.json({ message: 'Update added' });
  } catch (error) {
    console.error('Add update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
