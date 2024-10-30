import {
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  TagSuccessResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { ZodError, z } from "zod";

export const editTourCategory = async (
  id: number,
  formData: FormData
): Promise<ApiResponse<TagSuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries());
  const formattedObject: CreateTourCategorySchema = {
    name: formObject.name as string,
    description: formObject.description as string | undefined,
    parentid: formObject.parentid
      ? parseInt(formObject.parentid as string, 10)
      : undefined,
  };
  console.log({ formData });
  console.log({ formObject });
  try {
    const data = CreateTourCategoryFormSchema.parse(formattedObject);
    return await apiRequest<TourCategorySuccessResponse>(
      "tour/category/" + id,
      "POST",
      data
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
