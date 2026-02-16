"use server";
import { z } from "zod";
import { schemas } from "@/lib/client.generated";
import api from "@/lib/api-client";
import { setClientSession } from "@/lib/client-session";
import { redirect } from "next/navigation";

type SignInData = z.infer<typeof schemas.SignInDto>;

export async function loginAction(_prevState: SignInData, formData: FormData) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = schemas.SignInDto.safeParse(values);

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
