import { clsx, type ClassValue } from "clsx";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
