import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getTokenFromHeader } from '@/lib/auth';
import { hasDatabase } from '@/lib/db';

// GET - List all equipment
export async function GET() {
  try {
    if (!hasDatabase) {
      return NextResponse.json({ equipment: [], message: 'Database not connected' });
    }

    const result = await sql`
      SELECT * FROM equipment ORDER BY id ASC
    `;
    return NextResponse.json({ equipment: result.rows });
  } catch (error: unknown) {
    console.error('Equipment list error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data equipment' },
      { status: 500 }
    );
  }
}

// POST - Book equipment
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const user = getTokenFromHeader(authHeader);

    if (!user) {
      return NextResponse.json(
        { error: 'Silakan login terlebih dahulu' },
        { status: 401 }
      );
    }

    const { equipment_id, start_date, end_date } = await request.json();

    if (!equipment_id || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Equipment, tanggal mulai, dan tanggal selesai wajib diisi' },
        { status: 400 }
      );
    }

    // Validate equipment_id is a positive integer
    if (!Number.isInteger(equipment_id) || equipment_id <= 0) {
      return NextResponse.json(
        { error: 'Equipment ID tidak valid' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(start_date);
    const end = new Date(end_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Format tanggal tidak valid' },
        { status: 400 }
      );
    }

    if (start < today) {
      return NextResponse.json(
        { error: 'Tanggal mulai tidak boleh di masa lalu' },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { error: 'Tanggal selesai harus setelah tanggal mulai' },
        { status: 400 }
      );
    }

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (days > 365) {
      return NextResponse.json(
        { error: 'Durasi booking maksimal 365 hari' },
        { status: 400 }
      );
    }

    // Database required
    if (!hasDatabase) {
      return NextResponse.json(
        { error: 'Layanan tidak tersedia' },
        { status: 503 }
      );
    }

    // Production mode
    const eq = await sql`SELECT * FROM equipment WHERE id = ${equipment_id}`;
    if (eq.rows.length === 0) {
      return NextResponse.json({ error: 'Equipment tidak ditemukan' }, { status: 404 });
    }

    const equipment = eq.rows[0];
    if (!equipment.available) {
      return NextResponse.json({ error: 'Equipment sedang tidak tersedia' }, { status: 400 });
    }

    const total_price = days * equipment.price_per_day;

    const result = await sql`
      INSERT INTO bookings (user_id, equipment_id, start_date, end_date, total_price, status)
      VALUES (${user.id}, ${equipment_id}, ${start_date}, ${end_date}, ${total_price}, 'pending')
      RETURNING *
    `;

    await sql`UPDATE equipment SET available = false WHERE id = ${equipment_id}`;

    return NextResponse.json({
      message: 'Booking berhasil',
      booking: result.rows[0]
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
