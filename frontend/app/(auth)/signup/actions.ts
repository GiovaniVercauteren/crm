"use server";

import { signUp } from "@/dal/endpoints/auth";
import { SignUpDto } from "@/lib/client";
import { ServerActionResult } from "@/lib/types";
import { generateErrorMessage } from "@/lib/utils";

export async function signUpAction(
  data: SignUpDto,
): Promise<ServerActionResult> {
  try {
    await signUp(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: await generateErrorMessage(error) };
  }
}
