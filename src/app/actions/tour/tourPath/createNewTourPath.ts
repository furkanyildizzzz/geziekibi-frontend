import { ApiResponse, TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewTourPath = async (
  formData: FieldValues
): Promise<ApiResponse<TourPathSuccessResponse>> => {
  try {
    return await apiRequest<TourPathSuccessResponse>(
      "tour/path/",
      "POST",
      formData
    );
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
