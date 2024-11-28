import {
  ApiResponse,
  BlogCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getBlogCategoryById = async (
  id: number
): Promise<ApiResponse<BlogCategorySuccessResponse>> => {
  const response = await apiRequest<BlogCategorySuccessResponse>(
    "blog/category/" + id,
    "GET"
  );

  return response;
};
