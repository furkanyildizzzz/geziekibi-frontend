import {
  ApiResponse,
  EmailTemplateListSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getEmailTemplateList = async (): Promise<
  ApiResponse<EmailTemplateListSuccessResponse[]>
> => {
  const response = await apiRequest<EmailTemplateListSuccessResponse[]>(
    "email/templates/",
    "GET"
  );
  return response;
};
