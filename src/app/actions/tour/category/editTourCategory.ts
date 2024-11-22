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
import { ZodError, z } from "zod";

export const editTourCategory = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<TourCategorySuccessResponse>> => {
  try {
    console.log({ fieldValues });
    // Create a new FormData instance
    const formData = new FormData();

    // Append each entry of formValues to formData, with special handling for arrays and objects
    Object.entries(fieldValues).forEach(([key, value]: [string, any]) => {
      if (key === "primaryImages" && value.length > 0) {
        for (let index = 0; index < value.length; index++) {
          const file = value[index].file;
          formData.append(key, file);
        }
      } else if (typeof value === "object" && value !== null) {
        // Convert arrays or objects to JSON strings
        formData.append(key, JSON.stringify(value));
      } else {
        // Append simple key-value pairs as-is
        if (value) {
          formData.append(key, value);
        }
      }
    });
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    return await apiRequest<TourCategorySuccessResponse>(
      "tour/category/" + id,
      "POST",
      formData
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
