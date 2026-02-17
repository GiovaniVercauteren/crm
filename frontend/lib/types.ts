import { z, ZodTypeAny } from "zod";

export type FormState<T> = {
  values: T;
  errors: Record<string, string[]> | null;
  success: boolean;
};

export type Infer<T extends ZodTypeAny> = z.infer<T>;
