"use server";

import { updateToken } from "@/dal/endpoints/auth";
import { isAuthenticated } from "@/lib/auth";
import { cookies } from "next/headers";

export const updateAccessTokenAction = async () => {
  try {
    if (!(await isAuthenticated())) {
      // If the user is not authenticated, do not attempt to update the token
      return;
    }
    const accessToken = await updateToken();
    const cookieStore = await cookies();
    cookieStore.set(process.env.ACCESS_TOKEN_COOKIE_NAME!, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION),
    });
    return accessToken;
  } catch {
    throw new Error("Failed to update access token");
  }
};
