import { ApiResponse, ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getServiceList = async (): Promise<
  ApiResponse<ServiceSuccessResponse[]>
> => {
  const response = await apiRequest<ServiceSuccessResponse[]>(
    "tour/service/",
    "GET"
  );

  return response;
};
