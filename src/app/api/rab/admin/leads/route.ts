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

// GET /api/rab/admin/leads - List all leads
export async function GET(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let result;
    if (status && ['new', 'contacted', 'converted'].includes(status)) {
      result = await sql`
        SELECT * FROM rab_leads
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      result = await sql`
        SELECT * FROM rab_leads
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    const countResult = await sql`SELECT COUNT(*) as total FROM rab_leads`;

    return NextResponse.json({
      leads: result.rows,
      total: parseInt(countResult.rows[0].total),
    });
  } catch (error) {
    console.error('Admin leads fetch error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data leads' }, { status: 500 });
  }
}

// PATCH /api/rab/admin/leads - Update lead status
export async function PATCH(request: Request) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !Number.isInteger(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }
    if (!status || !['new', 'contacted', 'converted'].includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
    }

    await sql`UPDATE rab_leads SET status = ${status} WHERE id = ${id}`;

    return NextResponse.json({ message: 'Status berhasil diupdate', success: true });
  } catch (error) {
    console.error('Admin lead update error:', error);
    return NextResponse.json({ error: 'Gagal mengupdate status' }, { status: 500 });
  }
}
