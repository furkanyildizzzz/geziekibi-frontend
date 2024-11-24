import { ApiResponse, UserSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getUserById = async (
  id: number
): Promise<ApiResponse<UserSuccessResponse>> => {
  const response = await apiRequest<UserSuccessResponse>(
    "user/profile/" + id,
    "GET"
  );

  return response;
};
