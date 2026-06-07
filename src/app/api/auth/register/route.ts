import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { hasDatabase } from '@/lib/db';

// Simple in-memory rate limiter for registration
const registerAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_REGISTRATIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = registerAttempts.get(identifier);

  if (!record) {
    registerAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  if (now - record.lastAttempt > WINDOW_MS) {
    registerAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  record.count++;
  record.lastAttempt = now;

  return record.count > MAX_REGISTRATIONS;
}

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password minimal 8 karakter';
  if (password.length > 128) return 'Password terlalu panjang';
  return null;
}

function validateInput(name: string, email: string, company?: string, phone?: string): string | null {
  if (name.length > 255) return 'Nama terlalu panjang';
  if (name.length < 2) return 'Nama minimal 2 karakter';
  if (!validateEmail(email)) return 'Format email tidak valid';
  if (email.length > 255) return 'Email terlalu panjang';
  if (company && company.length > 255) return 'Nama perusahaan terlalu panjang';
  if (phone && phone.length > 50) return 'Nomor telepon terlalu panjang';
  if (phone && !/^[0-9+\-() ]+$/.test(phone)) return 'Format nomor telepon tidak valid';
  return null;
}

export async function POST(request: Request) {
  try {
    const { name, email, password, company, phone } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Input validation
    const inputError = validateInput(name, email, company, phone);
    if (inputError) {
      return NextResponse.json({ error: inputError }, { status: 400 });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    // Rate limiting by email
    if (isRateLimited(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan registrasi. Silakan coba lagi dalam 1 jam.' },
        { status: 429 }
      );
    }

    // Database required for registration
    if (!hasDatabase) {
      return NextResponse.json(
        { error: 'Layanan tidak tersedia. Database belum dikonfigurasi.' },
        { status: 503 }
      );
    }

    // Production mode with database
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, password_hash, company, phone)
      VALUES (${name}, ${email}, ${password_hash}, ${company || null}, ${phone || null})
      RETURNING id, name, email, company, phone, created_at
    `;

    const user = result.rows[0];
    const token = signToken({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user: { id: user.id, name: user.name, email: user.email, company: user.company },
      token
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
