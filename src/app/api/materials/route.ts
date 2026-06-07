import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getTokenFromHeader } from '@/lib/auth';
import { hasDatabase } from '@/lib/db';

// GET - List all materials
export async function GET() {
  try {
    if (!hasDatabase) {
      return NextResponse.json({ materials: [], message: 'Database not connected' });
    }

    const result = await sql`
      SELECT * FROM materials ORDER BY id ASC
    `;
    return NextResponse.json({ materials: result.rows });
  } catch (error: unknown) {
    console.error('Materials list error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data material' },
      { status: 500 }
    );
  }
}

// POST - Create material order
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

    const { items, shipping_address } = await request.json();

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Keranjang kosong' },
        { status: 400 }
      );
    }

    if (items.length > 100) {
      return NextResponse.json(
        { error: 'Maksimal 100 item per order' },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item || !Number.isInteger(item.id) || item.id <= 0) {
        return NextResponse.json(
          { error: 'Item ID tidak valid' },
          { status: 400 }
        );
      }
      if (!Number.isInteger(item.qty) || item.qty <= 0 || item.qty > 10000) {
        return NextResponse.json(
          { error: 'Quantity harus antara 1-10000' },
          { status: 400 }
        );
      }
    }

    // Validate shipping address
    if (shipping_address && typeof shipping_address === 'string' && shipping_address.length > 500) {
      return NextResponse.json(
        { error: 'Alamat terlalu panjang (maksimal 500 karakter)' },
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

    // Production mode - calculate total price from DB
    let total_price = 0;
    for (const item of items) {
      const mat = await sql`SELECT price, stock FROM materials WHERE id = ${item.id}`;
      if (mat.rows.length === 0) {
        return NextResponse.json(
          { error: `Material dengan ID ${item.id} tidak ditemukan` },
          { status: 404 }
        );
      }
      if (mat.rows[0].stock < item.qty) {
        return NextResponse.json(
          { error: `Stok tidak mencukupi untuk material ID ${item.id}` },
          { status: 400 }
        );
      }
      total_price += mat.rows[0].price * item.qty;
    }

    const result = await sql`
      INSERT INTO material_orders (user_id, items, total_price, shipping_address, status)
      VALUES (${user.id}, ${JSON.stringify(items)}, ${total_price}, ${shipping_address || ''}, 'pending')
      RETURNING *
    `;

    return NextResponse.json({
      message: 'Order berhasil dibuat',
      order: result.rows[0]
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Order error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
