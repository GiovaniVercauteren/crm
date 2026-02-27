export type ServerActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};
