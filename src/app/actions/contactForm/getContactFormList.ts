import {
  ApiResponse,
  ContactFormSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getContactFormList = async (): Promise<
  ApiResponse<ContactFormSuccessResponse[]>
> => {
  const response = await apiRequest<ContactFormSuccessResponse[]>(
    "contactForm/",
    "GET"
  );

  return response;
};
