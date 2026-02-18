"use server";

import { getCurrentUser, logout } from "@/lib/client";

export async function fetchProfileAction() {
  const { data, error } = await getCurrentUser();

  if (error) {
    throw new Error("Failed to fetch user profile");
  }

  return data;
}

export async function logoutAction() {
  const { data, error } = await logout();

  if (error) {
    throw new Error("Failed to log out");
  }

  return data;
}
