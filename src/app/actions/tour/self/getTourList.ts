import { ApiResponse, TourSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourList = async (): Promise<
  ApiResponse<TourSuccessResponse[]>
> => {
  const response = await apiRequest<TourSuccessResponse[]>("tour/", "GET");

  return response;
};
