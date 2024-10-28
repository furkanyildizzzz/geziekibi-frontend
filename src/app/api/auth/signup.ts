import { SignupFormSchema, SignupSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  SignupSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { ZodError } from "zod";

export const signup = async (
  formData: FormData
): Promise<ApiResponse<SignupSuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries()) as SignupSchema;

  try {
    const data = SignupFormSchema.parse(formObject); // Zod throws an error if invalid

    // If validation is successful, proceed with the API request
    const response = await apiRequest<SignupSuccessResponse>(
      "auth/register",
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
