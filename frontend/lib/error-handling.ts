import z from "zod";
import { FormStateError } from "./types";

export class ValidationError extends Error {
  originalError: z.ZodError;

  constructor(message: string, originalError: z.ZodError) {
    super(message);
    this.name = "ValidationError";
    this.originalError = originalError;
  }

  getOriginalError(): z.ZodError {
    return this.originalError;
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedError";
  }
}

export function classifyError(error: unknown): Error {
  if (error instanceof z.ZodError) {
    return new ValidationError("Validation error", error);
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return new ApiError(error.message as string);
  }
  return new UnexpectedError("An unexpected error occurred");
}

export function handleFormError(error: unknown): FormStateError {
  const classifiedError = classifyError(error);
  if (classifiedError instanceof ValidationError) {
    return z.flattenError(classifiedError.getOriginalError());
  } else if (classifiedError instanceof ApiError) {
    return { formErrors: [classifiedError.message] };
  } else {
    return { formErrors: ["An unexpected error occurred"] };
  }
}
