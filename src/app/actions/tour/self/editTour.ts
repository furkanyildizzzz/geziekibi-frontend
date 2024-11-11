import { ApiResponse, TourSuccessResponse } from "@/Types/ApiResponseType";
import { FieldValues } from "react-hook-form";
import { createNewTour } from "./createNewTour";

export const editTour = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<TourSuccessResponse>> => {
  try {
    return createNewTour(fieldValues, id);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
