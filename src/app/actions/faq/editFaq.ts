import { CreateFAQFormSchema, CreateFAQSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  FAQSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { FieldValues } from "react-hook-form";
import { ZodError, z } from "zod";

export const editFAQ = async (
  id: number,
  formData: FieldValues
): Promise<ApiResponse<FAQSuccessResponse>> => {
  try {
    return await apiRequest<FAQSuccessResponse>("faq/" + id, "POST", formData);
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
