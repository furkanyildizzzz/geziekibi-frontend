import { ApiResponse, BlogListSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getBlogList = async (): Promise<
  ApiResponse<BlogListSuccessResponse[]>
> => {
  const response = await apiRequest<BlogListSuccessResponse[]>("blog/", "GET");
  return response;
};
