import {
  ApiResponse,
  BlogCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getBlogCategoryList = async (): Promise<
  ApiResponse<BlogCategorySuccessResponse[]>
> => {
  const response = await apiRequest<BlogCategorySuccessResponse[]>(
    "blog/category/",
    "GET"
  );

  return response;
};
