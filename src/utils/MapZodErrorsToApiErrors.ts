import { ApiErrorResponse, ErrorValidation } from "@/Types/ApiResponseType";
import { ZodError } from "zod";

// This function maps Zod validation errors to the ApiErrorResponse format
const mapZodErrorsToApiError = (zodError: ZodError): ApiErrorResponse => {
  const validationErrors: ErrorValidation[] = zodError.errors.map((error) => {
    const key = error.path.join("."); // Joins the path array to create the key
    return { [key]: error.message }; // Map the message to the key
  });

  return {
    errorType: "Validation",
    errorMessage: "Validation failed",
    errors: null,
    errorRaw: zodError, // You can include the raw Zod error for further debugging
    errorsValidation: validationErrors,
    stack: undefined,
  } as ApiErrorResponse;
};
export default mapZodErrorsToApiError;
