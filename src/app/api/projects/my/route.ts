import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { verifyToken, getTokenFromHeader } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET /api/projects/my - Client's assigned projects
export async function GET(request: Request) {
  // Support both Authorization header and cookie-based auth
  const authHeader = request.headers.get('authorization');
  let user = getTokenFromHeader(authHeader);

  // Fallback to cookie if no Authorization header
  if (!user) {
    const cookieStore = await cookies();
    const token = cookieStore.get('kbs_token')?.value;
    if (token) {
      user = verifyToken(token);
    }
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasDatabase) {
    return NextResponse.json({ projects: [] });
  }

  try {
    const result = await sql`
      SELECT p.*, pt.role as team_role
      FROM projects p
      JOIN project_team pt ON pt.project_id = p.id
      WHERE pt.user_id = ${user.id}
      ORDER BY p.updated_at DESC
    `;

    return NextResponse.json({ projects: result.rows });
  } catch (error) {
    console.error('Get my projects error:', error);
    return NextResponse.json({ projects: [] });
  }
}
