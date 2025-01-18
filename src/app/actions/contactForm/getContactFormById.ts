import {
  ApiResponse,
  ContactFormSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getContactFormById = async (
  id: number
): Promise<ApiResponse<ContactFormSuccessResponse>> => {
  const response = await apiRequest<ContactFormSuccessResponse>(
    "contactForm/" + id,
    "GET"
  );

  return response;
};
