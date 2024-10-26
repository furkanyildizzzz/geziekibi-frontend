import { ApiResponse, TagSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTagById = async (
  id: number
): Promise<ApiResponse<TagSuccessResponse>> => {
  const response = await apiRequest<TagSuccessResponse>("tag/" + id, "GET");

  return response;
};
