// utils/validateForm.ts
import { ZodSchema } from "zod";

export function validateForm<T>(schema: ZodSchema<T>, formData: T) {
  const validationResult = schema.safeParse(formData);
  if (!validationResult.success) {
    return {
      valid: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  return {
    valid: true,
    data: validationResult.data,
    errors: null,
  };
}
