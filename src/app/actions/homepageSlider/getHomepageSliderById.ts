import {
  ApiResponse,
  HomepageSliderSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getHomepageSliderById = async (
  id: number
): Promise<ApiResponse<HomepageSliderSuccessResponse>> => {
  const response = await apiRequest<HomepageSliderSuccessResponse>(
    "homepageSlider/" + id,
    "GET"
  );
  return response;
};
