import {
  ApiErrorResponse,
  ApiResponse,
  ContactFormSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { FieldValues } from "react-hook-form";
import { ZodError, z } from "zod";

export const editContactForm = async (
  id: number,
  formData: FieldValues
): Promise<ApiResponse<ContactFormSuccessResponse>> => {
  try {
    return await apiRequest<ContactFormSuccessResponse>(
      "contactForm/" + id,
      "POST",
      formData
    );
  } catch (error) {
    // If Zod validation fails, map the error to ApiErrorResponse
    if (error instanceof ZodError) {
      const apiErrorResponse = mapZodErrorsToApiError(error);
      console.log({ apiErrorResponse });
      return apiErrorResponse as ApiErrorResponse; // Return the mapped error response
    }

    // Handle any other errors (if necessary)
    throw error;
  }
};
