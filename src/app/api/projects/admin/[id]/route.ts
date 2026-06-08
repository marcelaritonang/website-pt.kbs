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

// PUT /api/projects/admin/[id] - Update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    let paramIdx = 1;

    const allowedFields: Record<string, string> = {
      title: 'title',
      titleEn: 'title_en',
      client: 'client',
      category: 'category',
      subCategory: 'sub_category',
      description: 'description',
      descriptionEn: 'description_en',
      contractNumber: 'contract_number',
      locationName: 'location_name',
      latitude: 'latitude',
      longitude: 'longitude',
      startDate: 'start_date',
      endDate: 'end_date',
      estimatedEndDate: 'estimated_end_date',
      progress: 'progress',
      status: 'status',
      currentPhase: 'current_phase',
      budget: 'budget',
      imageUrl: 'image_url',
      scope: 'scope',
      scopeEn: 'scope_en',
    };

    for (const [key, col] of Object.entries(allowedFields)) {
      if (body[key] !== undefined) {
        fields.push(`${col} = $${paramIdx++}`);
        values.push(body[key]);
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    fields.push(`updated_at = NOW()`);
    values.push(parseInt(id));

    const query = `UPDATE projects SET ${fields.join(', ')} WHERE id = $${paramIdx}`;
    await sql.query(query, values);

    return NextResponse.json({ message: 'Project updated' });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/projects/admin/[id] - Delete project
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await sql`DELETE FROM projects WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
