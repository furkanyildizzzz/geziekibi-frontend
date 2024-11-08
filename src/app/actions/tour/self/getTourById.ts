import { ApiResponse, TourSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourById = async (
  id: number
): Promise<ApiResponse<TourSuccessResponse>> => {
  const response = await apiRequest<TourSuccessResponse>("tour/" + id, "GET");

  return response;
};
