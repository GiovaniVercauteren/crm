"use server";

import { redirect } from "next/navigation";
import { SignInDto } from "@/lib/client";
import { signIn } from "@/dal/endpoints/auth";
import { cookies } from "next/headers";
import { throwServerActionError } from "@/lib/utils";

export async function loginAction(data: SignInDto) {
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
  } catch (error) {
    await throwServerActionError(error);
  }
}
