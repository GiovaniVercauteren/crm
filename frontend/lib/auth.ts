import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./client";

export function verifyAccessToken(token: string): JwtPayload | string | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Invalid access token:", error);
    return null;
  }
}

async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || null;
  return accessToken;
}

export async function isAuthenticated(): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (accessToken) {
    return !!verifyAccessToken(accessToken);
  }

  return false;
}

export async function getRole(): Promise<Role | null> {
  const accessToken = await getAccessToken();

  const payload = accessToken ? verifyAccessToken(accessToken) : null;

  if (payload && typeof payload === "object" && "role" in payload) {
    return payload.role as Role;
  }

  return null;
}
