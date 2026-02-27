"use server";

import { SignInDto } from "@/lib/client";
import { signIn } from "@/dal/endpoints/auth";
import { cookies } from "next/headers";
import { generateErrorMessage } from "@/lib/utils";
import { ServerActionResult } from "@/lib/types";

export async function loginAction(
  data: SignInDto,
): Promise<ServerActionResult> {
  try {
    const accessToken = await signIn(data);
    const cookieStore = await cookies();
    cookieStore.set(process.env.ACCESS_TOKEN_COOKIE_NAME!, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: await generateErrorMessage(error) };
  }
}
