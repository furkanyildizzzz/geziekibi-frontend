import { ApiResponse, ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getServiceById = async (
  id: number
): Promise<ApiResponse<ServiceSuccessResponse>> => {
  const response = await apiRequest<ServiceSuccessResponse>(
    "service/" + id,
    "GET"
  );

  return response;
};
