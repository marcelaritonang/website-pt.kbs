import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getTokenFromHeader } from '@/lib/auth';

// GET - User's bookings
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
      SELECT b.*, e.name as equipment_name, e.image as equipment_image
      FROM bookings b
      JOIN equipment e ON b.equipment_id = e.id
      WHERE b.user_id = ${user.id}
      ORDER BY b.created_at DESC
    `;

    return NextResponse.json({ bookings: result.rows });

  } catch (error: unknown) {
    console.error('Bookings error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data booking' },
      { status: 500 }
    );
  }
}
