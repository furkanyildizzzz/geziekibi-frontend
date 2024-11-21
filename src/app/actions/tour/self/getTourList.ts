import {
  ApiResponse,
  TourListSuccessResponse,
  TourSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourList = async (): Promise<
  ApiResponse<TourListSuccessResponse[]>
> => {
  const response = await apiRequest<TourListSuccessResponse[]>("tour/", "GET");

  return response;
};
