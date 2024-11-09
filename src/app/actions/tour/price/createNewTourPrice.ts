import {
  CreateTourPriceFormSchema,
  CreateTourCategorySchema,
} from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import mapZodErrorsToApiError from "@/utils/MapZodErrorsToApiErrors";
import { FieldValues } from "react-hook-form";
import { ZodError } from "zod";

export const createNewTourPrice = async (
  formData: FieldValues
): Promise<ApiResponse<TourPriceSuccessResponse>> => {
  try {
    const data = CreateTourPriceFormSchema.parse(formData);
    return await apiRequest<TourPriceSuccessResponse>(
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
