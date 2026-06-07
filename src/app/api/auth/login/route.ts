import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { hasDatabase } from '@/lib/db';

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  // Reset window if expired
  if (now - record.lastAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  record.count++;
  record.lastAttempt = now;

  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Rate limiting by email
    if (isRateLimited(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.' },
        { status: 429 }
      );
    }

    // Database required for login
    if (!hasDatabase) {
      return NextResponse.json(
        { error: 'Layanan tidak tersedia. Database belum dikonfigurasi.' },
        { status: 503 }
      );
    }

    // Production mode with database
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({
      message: 'Login berhasil',
      user: { id: user.id, name: user.name, email: user.email, company: user.company },
      token
    });

  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
