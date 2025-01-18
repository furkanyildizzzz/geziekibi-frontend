import { ApiResponse, FAQSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewFAQ = async (
  formData: FieldValues
): Promise<ApiResponse<FAQSuccessResponse>> => {
  try {
    return await apiRequest<FAQSuccessResponse>("faq/", "POST", formData);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
