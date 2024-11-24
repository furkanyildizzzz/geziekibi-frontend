import { ApiResponse, UserSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const changePassword = async (
  fieldValues: FieldValues
): Promise<ApiResponse<UserSuccessResponse>> => {
  const response = await apiRequest<UserSuccessResponse>(
    "user/changePassword/",
    "POST",
    fieldValues
  );

  return response;
};
