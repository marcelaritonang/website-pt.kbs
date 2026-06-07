import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getTokenFromHeader } from '@/lib/auth';

// GET - User's material orders
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getTokenFromHeader(authHeader);

    if (!user) {
      return NextResponse.json(
        { error: 'Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    const result = await sql`
      SELECT * FROM material_orders
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ orders: result.rows });

  } catch (error: unknown) {
    console.error('Orders error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data order' },
      { status: 500 }
    );
  }
}
