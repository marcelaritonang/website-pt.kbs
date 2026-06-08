import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';

// GET /api/projects/[id] - Single project detail
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!hasDatabase) {
    return NextResponse.json({ error: 'No database' }, { status: 503 });
  }

  try {
    const result = await sql`
      SELECT * FROM projects WHERE id = ${parseInt(id)}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Get updates
    const updates = await sql`
      SELECT pu.*, u.name as updater_name
      FROM project_updates pu
      LEFT JOIN users u ON pu.updated_by = u.id
      WHERE pu.project_id = ${parseInt(id)}
      ORDER BY pu.created_at DESC
      LIMIT 20
    `;

    // Get team
    const team = await sql`
      SELECT pt.*, u.name, u.email, u.company
      FROM project_team pt
      JOIN users u ON pt.user_id = u.id
      WHERE pt.project_id = ${parseInt(id)}
    `;

    return NextResponse.json({
      project: result.rows[0],
      updates: updates.rows,
      team: team.rows,
    });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
