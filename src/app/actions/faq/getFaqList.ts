import { ApiResponse, FAQSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getFAQList = async (): Promise<
  ApiResponse<FAQSuccessResponse[]>
> => {
  const response = await apiRequest<FAQSuccessResponse[]>("faq/", "GET");

  return response;
};
