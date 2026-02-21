"use server";

import { getCurrentUser } from "@/dal/endpoints/auth";

export async function fetchProfileAction() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}
