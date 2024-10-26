import { CreateTagFormSchema, CreateTagSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { ZodError, z } from "zod";

export const editTag = async (
  id: number,
  formData: FormData
): Promise<ApiResponse<TagSuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries()) as CreateTagSchema;

  console.log({ formObject });
  try {
    const data = CreateTagFormSchema.parse(formObject);
    return await apiRequest<TagSuccessResponse>("tag/" + id, "POST", data);
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
