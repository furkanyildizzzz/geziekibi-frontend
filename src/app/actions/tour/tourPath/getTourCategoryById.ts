import { ApiResponse, TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourPathById = async (
  id: number
): Promise<ApiResponse<TourPathSuccessResponse>> => {
  const response = await apiRequest<TourPathSuccessResponse>(
    "tour/path/" + id,
    "GET"
  );

  return response;
};
