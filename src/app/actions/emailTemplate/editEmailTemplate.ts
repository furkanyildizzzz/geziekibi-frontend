import {
  ApiResponse,
  EmailTemplateSuccessResponse,
} from "@/Types/ApiResponseType";
import { FieldValues } from "react-hook-form";
import { apiRequest } from "@/utils/ApiRequest";
import { EmailTemplateEnum } from "@/app/lib/enums";

export const editEmailTemplate = async (
  key: EmailTemplateEnum,
  fieldValues: FieldValues
): Promise<ApiResponse<EmailTemplateSuccessResponse>> => {
  try {
    return await apiRequest<EmailTemplateSuccessResponse>(
      "email/templates/" + key.toString(),
      "POST",
      fieldValues
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
