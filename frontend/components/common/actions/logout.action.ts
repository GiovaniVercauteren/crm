"use server";

import { logout } from "@/lib/client";

export async function logoutAction() {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
