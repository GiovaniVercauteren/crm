"use server";

import { redirect } from "next/navigation";
import { FormState } from "@/lib/types";
import { SignInDto, signIn } from "@/lib/client";
import { handleFormError } from "@/lib/error-handling";

export async function loginAction(
  _prevState: FormState<SignInDto>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    await signIn({
      body: values,
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
