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

// POST /api/projects/admin/[id]/team - Assign user to project
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
    const { userId, role } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Check if already assigned
    const existing = await sql`
      SELECT id FROM project_team WHERE project_id = ${projectId} AND user_id = ${userId}
    `;

    if (existing.rows.length > 0) {
      // Update role
      await sql`
        UPDATE project_team SET role = ${role || 'client'} WHERE project_id = ${projectId} AND user_id = ${userId}
      `;
    } else {
      await sql`
        INSERT INTO project_team (project_id, user_id, role)
        VALUES (${projectId}, ${userId}, ${role || 'client'})
      `;
    }

    return NextResponse.json({ message: 'Team member assigned' });
  } catch (error) {
    console.error('Assign team error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/projects/admin/[id]/team - Remove user from project
export async function DELETE(
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
    const { userId } = body;

    await sql`
      DELETE FROM project_team WHERE project_id = ${projectId} AND user_id = ${userId}
    `;

    return NextResponse.json({ message: 'Team member removed' });
  } catch (error) {
    console.error('Remove team error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
