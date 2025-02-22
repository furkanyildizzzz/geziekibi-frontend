import { ApiResponse, TourSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest, apiRequestWithToken } from "@/utils/ApiRequest";
import { cookies } from "next/headers";

export const getTourById = async (
  id: number
): Promise<ApiResponse<TourSuccessResponse>> => {
  // Token'ı cookies'ten al
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const response = await apiRequestWithToken<TourSuccessResponse>(
    "tour/" + id,
    "GET",
    token!
  );

  return response;
};
