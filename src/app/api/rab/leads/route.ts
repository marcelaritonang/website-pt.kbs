import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';

// POST /api/rab/leads - Submit a lead from RAB calculator
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, phone } = body;
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nama harus minimal 2 karakter' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ error: 'Nomor telepon tidak valid' }, { status: 400 });
    }

    // Sanitize
    const lead = {
      name: name.trim().slice(0, 255),
      phone: phone.trim().slice(0, 50),
      email: (body.email || '').trim().slice(0, 255),
      company: (body.company || '').trim().slice(0, 255),
      buildingType: body.buildingType || null,
      area: parseInt(body.area) || null,
      floors: parseInt(body.floors) || null,
      quality: body.quality || null,
      region: body.region || null,
      estimatedCost: parseInt(body.estimatedCost) || null,
      message: (body.message || '').trim().slice(0, 1000),
    };

    if (hasDatabase) {
      await sql`
        INSERT INTO rab_leads (name, phone, email, company, building_type, area, floors, quality, region, estimated_cost, message, status)
        VALUES (
          ${lead.name}, ${lead.phone}, ${lead.email}, ${lead.company},
          ${lead.buildingType}, ${lead.area}, ${lead.floors}, ${lead.quality}, ${lead.region},
          ${lead.estimatedCost}, ${lead.message}, 'new'
        )
      `;

      return NextResponse.json({ message: 'Lead berhasil disimpan', success: true }, { status: 201 });
    }

    // No DB - still return success (lead would be captured via WhatsApp)
    return NextResponse.json({ message: 'Terima kasih, tim kami akan menghubungi Anda', success: true });
  } catch (error) {
    console.error('RAB lead error:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data' },
      { status: 500 }
    );
  }
}
