import { TourValidationFormSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  ErrorValidation,
  TourSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";
import { ZodError } from "zod";

export const createNewTour = async (
  formFields: FieldValues,
  id: number = 0
): Promise<ApiResponse<TourSuccessResponse>> => {
  try {
    console.log({ id, formFields });
    const data = TourValidationFormSchema.parse(formFields);
    // Create a new FormData instance
    const formData = new FormData();

    // Append each entry of formValues to formData, with special handling for arrays and objects
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      if (value instanceof Date) {
        // If the value is a Date object, convert it to an ISO string
        formData.append(key, value.toISOString()); // e.g., "2023-11-06T12:34:56.789Z"
      } else if (
        (key === "primaryImages" || key === "galleryImages") &&
        value.length > 0
      ) {
        for (let index = 0; index < value.length; index++) {
          const file = value[index].file;
          console.log({ key, file });
          formData.append(key, file);
        }
      } else if (typeof value === "object" && value !== null) {
        // Convert arrays or objects to JSON strings
        formData.append(key, JSON.stringify(value));
      } else {
        // Append simple key-value pairs as-is
        formData.append(key, value);
      }
    });
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    if (id > 0) {
      return await apiRequest<TourSuccessResponse>(
        "tour/" + id,
        "POST",
        formData
      );
    } else {
      return await apiRequest<TourSuccessResponse>("tour/", "POST", formData);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorsValidation: ErrorValidation[] = error.errors.map((issue) => ({
        [issue.path.join(".")]: issue.message,
      }));

      return {
        errorType: "Validation",
        errorMessage: "Validation error",
        errors: error.errors.map((issue) => issue.message),
        errorRaw: error,
        errorsValidation,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      } as ApiErrorResponse;
    }
    throw error;
  }
};
