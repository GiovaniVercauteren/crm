"use server";

import { redirect } from "next/navigation";
import { FormState } from "@/lib/types";
import { SignInDto } from "@/lib/client";
import { signIn } from "@/lib/client";
import { handleFormError } from "@/lib/error-handling";

export async function loginAction(
  _prevState: FormState<SignInDto>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await signIn({
    body: values,
  });

  if (error) {
    return {
      values,
      errors: handleFormError(error),
      success: false,
    };
  }

  redirect("/profile");
}
