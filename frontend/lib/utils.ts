import { clsx, type ClassValue } from "clsx";
import { isHTTPError } from "ky";
import { twMerge } from "tailwind-merge";
import { ServerActionResult } from "./types";
import { UseFormReturn } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateErrorMessage = async (error: unknown): Promise<string> => {
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

export const parseErrorToServerActionResult = async (
  error: unknown,
): Promise<ServerActionResult> => {
  return { success: false, error: await generateErrorMessage(error) };
};

export const errorHandledFormSubmit = async <T>(
  action: (data: T) => Promise<ServerActionResult>,
  data: T,
  form: UseFormReturn<T extends object ? T : never, unknown, T>,
): Promise<ServerActionResult> => {
  try {
    const result = await action(data);
    if (!result.success) {
      form.setError("root.server", {
        message: result.error || "An unknown error occurred.",
      });
    }
    return result;
  } catch (error) {
    const errorMessage = await generateErrorMessage(error);
    form.setError("root.server", {
      message: errorMessage,
    });
    return { success: false, error: errorMessage };
  }
};
