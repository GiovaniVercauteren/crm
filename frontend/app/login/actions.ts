"use server";

import api from "@/lib/api-client";
import { setClientSession } from "@/lib/client-session";
import { redirect } from "next/navigation";
import { FormState, Infer } from "@/lib/types";
import { SignInDto } from "@/lib/client.generated";

export async function loginAction(
  _prevState: FormState<Infer<typeof SignInDto>>,
  formData: FormData,
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = SignInDto.safeParse(values);

  if (!result.success) {
    return {
      values,
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await api.login(values);
    // Store a user session cookie, different from the session from the server, to manage client-side session state
    await setClientSession();
  } catch (error) {
    console.error("Login failed:", error);
  }

  redirect("/profile");
}
