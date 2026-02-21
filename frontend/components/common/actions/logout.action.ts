"use server";

import { cookies } from "next/dist/server/request/cookies";

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
