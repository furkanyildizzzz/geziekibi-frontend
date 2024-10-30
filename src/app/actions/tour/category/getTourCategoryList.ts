import {
  ApiResponse,
  TourCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourCategoryList = async (): Promise<
  ApiResponse<TourCategorySuccessResponse[]>
> => {
  const response = await apiRequest<TourCategorySuccessResponse[]>(
    "tour/category/",
    "GET"
  );

  return response;
};
