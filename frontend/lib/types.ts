import z from "zod";

export type FormState<T> = {
  values: T;
  errors?: {
    validation?: z.core.$ZodFlattenedError<T> | null;
    server?: string;
  } | null;
  success?: boolean;
};
