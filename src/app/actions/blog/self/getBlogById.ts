import { ApiResponse, BlogSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getBlogById = async (
  id: number
): Promise<ApiResponse<BlogSuccessResponse>> => {
  const response = await apiRequest<BlogSuccessResponse>("blog/" + id, "GET");
  return response;
};
