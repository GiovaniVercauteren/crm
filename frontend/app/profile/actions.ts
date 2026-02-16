"use server";

import api from "@/lib/api-client";

export async function getProfileAction() {
  const result = await api.session();
  return result;
}

export async function getPermissionsAction() {
  const result = await api.permissions();
  return result;
}
