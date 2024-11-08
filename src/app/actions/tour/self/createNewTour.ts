import { TourValidationSchema } from "@/app/lib/definitions";
import { ApiResponse, TourSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewTour = async (
  formFields: FieldValues
): Promise<ApiResponse<TourSuccessResponse>> => {
  try {
    const data = TourValidationSchema.parse(formFields);
    // Create a new FormData instance
    const formData = new FormData();

    // Append each entry of formValues to formData, with special handling for arrays and objects
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      if (value instanceof Date) {
        // If the value is a Date object, convert it to an ISO string
        formData.append(key, value.toISOString()); // e.g., "2023-11-06T12:34:56.789Z"
      } else if (key === "image") {
        formData.append(key, value);
      } else if (key === "gallery" && value.length) {
        for (let index = 0; index < value.length; index++) {
          const file = value[index];
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
    return await apiRequest<TourSuccessResponse>("tour/", "POST", formData);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
