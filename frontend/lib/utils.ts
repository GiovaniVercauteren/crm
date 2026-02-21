import { clsx, type ClassValue } from "clsx";
import { isHTTPError } from "ky";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = async (error: unknown) => {
  if (isHTTPError(error)) {
    try {
      const errorData = await error.response.json();
      if (
        errorData &&
        typeof errorData === "object" &&
        "message" in errorData
      ) {
        return (errorData as { message: string }).message;
      }
    } catch {
      // If parsing fails, fall back to the status text
      return `Request failed with status ${error.response.status}`;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred.";
};
