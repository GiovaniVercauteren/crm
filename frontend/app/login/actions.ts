"use server";

import { redirect } from "next/navigation";
import { FormState } from "@/lib/types";
import { SignInDto, signIn } from "@/lib/client";
import { handleFormError } from "@/lib/error-handling";
import { cookies } from "next/headers";

export async function loginAction(
  _prevState: FormState<SignInDto>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { data: accessToken } = await signIn({
      body: values,
    });
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 12 * 60 * 60, // 12 hours in seconds
    });
  } catch (error) {
    return {
      values,
      errors: handleFormError(error),
      success: false,
    };
  }

  redirect("/profile");
}
