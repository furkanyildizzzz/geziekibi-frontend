import { StaticPageValidationFormSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  StaticPageSuccessResponse,
  ErrorValidation,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewStaticPage = async (
  formFields: FieldValues,
  id: number = 0
): Promise<ApiResponse<StaticPageSuccessResponse>> => {
  try {
    return await apiRequest<StaticPageSuccessResponse>(
      "staticPage/",
      "POST",
      formFields
    );
  } catch (error) {
    throw error;
  }
};
