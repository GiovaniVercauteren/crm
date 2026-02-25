"use server";

import { cookies } from "next/dist/server/request/cookies";
import { redirect } from "next/navigation";

export async function logoutAction(redirectTo?: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
  } catch (error) {
    console.error("Error during logout:", error);
  }
  if (redirectTo) {
    redirect(redirectTo);
  }
}
