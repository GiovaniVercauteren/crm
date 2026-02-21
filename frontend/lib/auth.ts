import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role, UserEntity } from "./client";
import { cache } from "react";

export const verifyAccessToken = cache(
  (token: string): JwtPayload | string | null => {
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
  },
);

export const getAccessToken = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const accessToken =
    cookieStore.get(process.env.ACCESS_TOKEN_COOKIE_NAME!)?.value || null;
  return accessToken;
});

export const isAuthenticated = cache(async (): Promise<boolean> => {
  const accessToken = await getAccessToken();

  if (accessToken) {
    return !!verifyAccessToken(accessToken);
  }

  return false;
});

export const getUser = cache(async (): Promise<UserEntity | null> => {
  const accessToken = await getAccessToken();

  const payload = accessToken ? verifyAccessToken(accessToken) : null;

  if (
    payload &&
    typeof payload === "object" &&
    "id" in payload &&
    "email" in payload &&
    "firstName" in payload &&
    "lastName" in payload &&
    "role" in payload
  ) {
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role as Role,
    } as UserEntity;
  }

  return null;
});
