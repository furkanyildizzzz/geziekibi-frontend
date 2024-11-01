import { CreateTagFormSchema, CreateTagSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  TagSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { FieldValues } from "react-hook-form";
import { ZodError } from "zod";

export const createNewTagEski = async (
  formData: FormData
): Promise<ApiResponse<TagSuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries()) as CreateTagSchema;

  try {
    const data = CreateTagFormSchema.parse(formObject);
    return await apiRequest<TagSuccessResponse>("tag/", "POST", data);
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

export const createNewTag = async (
  formData: FieldValues
): Promise<ApiResponse<TagSuccessResponse>> => {
  try {
    return await apiRequest<TagSuccessResponse>("tag/", "POST", formData);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
