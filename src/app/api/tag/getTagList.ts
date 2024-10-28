import { ApiResponse, TagSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTagList = async (): Promise<
  ApiResponse<TagSuccessResponse[]>
> => {
  const response = await apiRequest<TagSuccessResponse[]>("tag/", "GET");

  return response;
};
