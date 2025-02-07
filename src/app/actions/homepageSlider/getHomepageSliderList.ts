import {
  ApiResponse,
  HomepageSliderSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getHomepageSliderList = async (): Promise<
  ApiResponse<HomepageSliderSuccessResponse[]>
> => {
  const response = await apiRequest<HomepageSliderSuccessResponse[]>(
    "homepageSlider/",
    "GET"
  );
  return response;
};
