"use server";

import { signUp } from "@/dal/endpoints/auth";
import { SignUpDto } from "@/lib/client";
import { throwServerActionError } from "@/lib/utils";

export async function signUpAction(data: SignUpDto) {
  try {
    await signUp(data);
  } catch (error) {
    await throwServerActionError(error);
  }
}
