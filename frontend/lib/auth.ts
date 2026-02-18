import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function verifyAccessToken(token: string): boolean {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return false;
  }

  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    console.error("Invalid access token:", error);
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    return verifyAccessToken(accessToken);
  }

  return false;
}
