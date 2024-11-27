import { ApiResponse, TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getTourPathList = async (): Promise<
  ApiResponse<TourPathSuccessResponse[]>
> => {
  const response = await apiRequest<TourPathSuccessResponse[]>(
    "tour/path/",
    "GET"
  );

  return response;
};
