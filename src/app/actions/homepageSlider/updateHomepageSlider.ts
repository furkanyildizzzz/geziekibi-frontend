import {
  ApiResponse,
  HomepageSliderSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const updateHomepageSlider = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<HomepageSliderSuccessResponse>> => {
  const response = await apiRequest<HomepageSliderSuccessResponse>(
    "homepageSlider/" + id,
    "POST",
    fieldValues
  );

  return response;
};
