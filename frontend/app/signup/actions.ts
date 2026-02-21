"use server";

import { signUp } from "@/dal/endpoints/auth";
import { SignUpDto } from "@/lib/client";
import { zSignUpDto } from "@/lib/client/zod.gen";
import { FormState } from "@/lib/types";
import { handleError } from "@/lib/utils";
import { redirect } from "next/navigation";
import z from "zod";

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

  const validation = zSignUpDto
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .safeParse(values);
  if (!validation.success) {
    return {
      values,
      errors: {
        validation: z.flattenError(validation.error),
      },
      success: false,
    };
  }

  try {
    await signUp(values);
  } catch (error) {
    return {
      values,
      errors: { server: await handleError(error) },
      success: false,
    };
  }

  redirect("/login");
}
