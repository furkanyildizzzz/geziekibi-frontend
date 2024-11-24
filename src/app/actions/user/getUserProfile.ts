import { ApiResponse, UserSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getUserProfile = async (): Promise<
  ApiResponse<UserSuccessResponse>
> => {
  const response = await apiRequest<UserSuccessResponse>(
    "user/profile/",
    "GET"
  );

  return response;
};
