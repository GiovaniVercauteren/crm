"use server";

import { cookies } from "next/headers";

export async function getCurrentLanguage() {
  const cookieStore = await cookies();
  return cookieStore.get("language")?.value || "english";
}

export async function setLanguage(language: string) {
  const cookieStore = await cookies();
  cookieStore.set("language", language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 400, // 400 days, maximum allowed by browsers
  });
}
