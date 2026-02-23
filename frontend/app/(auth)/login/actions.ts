"use server";

import { redirect } from "next/navigation";
import { FormState } from "@/lib/types";
import { SignInDto } from "@/lib/client";
import { signIn } from "@/dal/endpoints/auth";
import { cookies } from "next/headers";
import { zSignInDto } from "@/lib/client/zod.gen";
import z from "zod";
import { handleError } from "@/lib/utils";

export async function loginAction(
  _prevState: FormState<SignInDto>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = zSignInDto.safeParse(values);
  if (!validation.success) {
    return {
      values,
      errors: { validation: z.flattenError(validation.error) },
      success: false,
    };
  }

  try {
    const accessToken = await signIn(values);
    const cookieStore = await cookies();
    cookieStore.set(process.env.ACCESS_TOKEN_COOKIE_NAME!, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION),
    });
  } catch (error) {
    return {
      values,
      errors: { server: await handleError(error) },
      success: false,
    };
  }

  redirect("/profile");
}
