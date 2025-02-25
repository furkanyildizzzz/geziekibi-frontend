import { EmailTemplateEnum } from "@/app/lib/enums";
import {
  ApiResponse,
  EmailTemplateSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest, apiRequestWithToken } from "@/utils/ApiRequest";
import { cookies } from "next/headers";

export const getEmailTemplateByType = async (
  key: EmailTemplateEnum
): Promise<ApiResponse<EmailTemplateSuccessResponse>> => {
  const response = await apiRequest<EmailTemplateSuccessResponse>(
    "email/templates/" + key.toString(),
    "GET"
  );
  return response;
};
