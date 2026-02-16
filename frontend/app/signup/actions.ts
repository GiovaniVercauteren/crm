"use server";

import { signUp } from "@/services/auth/auth";
import { signupFormSchema, SignupFormState } from "../login/schemas";
import { ApiError } from "@/services/secure-fetch";
import z from "zod";

export async function signupAction(
  _prevState: SignupFormState,
  formData: FormData,
) {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = signupFormSchema.safeParse(values);

  if (!result.success) {
    return {
      values,
      errors: z.treeifyError(result.error),
      success: false,
    };
  }

  try {
    await signUp(values);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        values,
        errors: {
          errors: [error.message],
        },
        success: false,
      };
    }
  }

  return {
    values: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: null,
    success: true,
  };
}
