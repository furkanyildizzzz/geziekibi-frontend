import {
  CreateTourCategoryFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { FieldValues } from "react-hook-form";
import { ZodError } from "zod";

export const createNewTourCategory = async (
  formData: FieldValues
): Promise<ApiResponse<TourCategorySuccessResponse>> => {
  try {
    const data = CreateTourCategoryFormSchema.parse(formData);
    return await apiRequest<TourCategorySuccessResponse>(
      "tour/category/",
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const createNewTourCategoryEski = async (
  formData: FormData
): Promise<ApiResponse<TourCategorySuccessResponse>> => {
  const formObject = Object.fromEntries(formData.entries());
  const formattedObject: CreateTourCategorySchema = {
    name: formObject.name as string,
    description: formObject.description as string | undefined,
    parentid: formObject.parentid
      ? parseInt(formObject.parentid as string, 10)
      : undefined,
  };

  try {
    const data = CreateTourCategoryFormSchema.parse(formattedObject);
    return await apiRequest<TourCategorySuccessResponse>(
      "tour/category/",
      "POST",
      data
    );
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
