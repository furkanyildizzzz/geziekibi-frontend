import { SigninFormSchema, SigninSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  ErrorValidation,
  LoginSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { validateForm } from "@/utils/ValidateForm";
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

export const signin = async (
  formData: FormData
): Promise<ApiResponse<LoginSuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries()) as SigninSchema;
  // const { valid, errors, data } = validateForm(SigninFormSchema, formObject);

  // if (!valid) {
  //   console.log({ errors });
  //   const errorValidation = errors as ErrorValidation[];
  //   console.log({ errorValidation });
  //   const apiErrorResonse = errorValidation as ApiErrorResponse;
  //   throw errors as ErrorValidation[];
  // }

  try {
    // If validation is successful, proceed with the API request
    const data = SigninFormSchema.parse(formObject); // Zod throws an error if invalid

    // If validation is successful, proceed with the API request
    const response = await apiRequest<LoginSuccessResponse>(
      "auth/signin",
      "POST",
      data
    );

    return response;
  } catch (error) {
    // If Zod validation fails, map the error to ApiErrorResponse
    if (error instanceof ZodError) {
      const apiErrorResponse = mapZodErrorsToApiError(error);
      return apiErrorResponse as ApiErrorResponse; // Return the mapped error response
    }

    // Handle any other errors (if necessary)
    throw error;
  }
};
