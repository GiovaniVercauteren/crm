export type FormStateError = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[]>;
};

export type FormState<T> = {
  values: T;
  errors?: FormStateError | null;
  success?: boolean;
};
