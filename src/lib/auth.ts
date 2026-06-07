import jwt from 'jsonwebtoken';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable must be set');
  }
  return secret;
}

export function signToken(payload: { id: number; email: string; name: string }) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getJwtSecret()) as { id: number; email: string; name: string };
  } catch {
    return null;
  }
}

export function getTokenFromHeader(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');
  return verifyToken(token);
}
