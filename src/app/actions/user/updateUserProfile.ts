import { ApiResponse, UserSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const updateUserProfile = async (
  fieldValues: FieldValues
): Promise<ApiResponse<UserSuccessResponse>> => {
  const response = await apiRequest<UserSuccessResponse>(
    "user/profile/",
    "POST",
    fieldValues
  );

  return response;
};
