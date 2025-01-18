import { ApiResponse, FAQSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getFAQById = async (
  id: number
): Promise<ApiResponse<FAQSuccessResponse>> => {
  const response = await apiRequest<FAQSuccessResponse>("faq/" + id, "GET");

  return response;
};
