"use server";

import { signUp, SignUpDto } from "@/lib/client";
import { handleFormError } from "@/lib/error-handling";
import { FormState } from "@/lib/types";
import { redirect } from "next/navigation";

export async function signUpAction(
  _prevState: FormState<SignUpDto>,
  formData: FormData,
) {
  const values = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // Client-side validation for password confirmation
  if (values.password !== values.confirmPassword) {
    return {
      values,
      errors: {
        fieldErrors: {
          confirmPassword: ["Passwords do not match"],
        },
      },
      success: false,
    };
  }

  try {
    await signUp({
      body: values,
    });
  } catch (error) {
    return {
      values,
      errors: handleFormError(error),
      success: false,
    };
  }

  redirect("/login");
}
