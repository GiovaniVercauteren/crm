"use server";

import apiClient from "@/lib/api-client";
import { schemas } from "@/lib/client.generated";
import z from "zod";

type SignupData = z.infer<typeof schemas.SignUpDto>;

export async function signupAction(_prevState: SignupData, formData: FormData) {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = schemas.SignUpDto.safeParse(values);

  if (!result.success) {
    return {
      values,
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await apiClient.signup(values);
  } catch (error) {
    console.error("Signup failed:", error);
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
