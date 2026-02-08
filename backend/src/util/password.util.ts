import * as argon2 from 'argon2';

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return await argon2.hash(password, { secret: Buffer.from(salt) });
}

export async function verifyPassword(
  hash: string,
  password: string,
  salt: string,
): Promise<boolean> {
  return await argon2.verify(hash, password, { secret: Buffer.from(salt) });
}

export function generateSalt(length: number = 16): string {
  const salt = Buffer.alloc(length);
  for (let i = 0; i < length; i++) {
    salt[i] = Math.floor(Math.random() * 256);
  }
  return salt.toString('hex');
}
