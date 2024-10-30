import {
  ApiResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourCategoryById = async (
  id: number
): Promise<ApiResponse<TourCategorySuccessResponse>> => {
  const response = await apiRequest<TourCategorySuccessResponse>(
    "tour/category/" + id,
    "GET"
  );

  return response;
};
