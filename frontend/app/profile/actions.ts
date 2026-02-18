"use server";

import { getCurrentUser } from "@/lib/client";

export async function fetchProfileAction() {
  try {
    const { data } = await getCurrentUser();
    return data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}
