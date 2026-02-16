"use server";

import apiClient from "@/lib/api-client";
import { clearClientSession } from "@/lib/client-session";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    await apiClient.logout();
    await clearClientSession();
  } catch (error) {
    console.error("Error during logout:", error);
  }
  redirect("/login");
}
