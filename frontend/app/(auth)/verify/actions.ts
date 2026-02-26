"use server";

import { updateAccessTokenAction } from "@/app/_actions/update-token.action";
import { verifyEmail } from "@/dal/endpoints/auth";

export async function verifyEmailAction(
  userId: number,
  email: string,
  token: string,
) {
  try {
    const success = await verifyEmail(userId, email, token);
    await updateAccessTokenAction();
    return success;
  } catch {
    throw new Error("Failed to verify email. Please try again.");
  }
}
