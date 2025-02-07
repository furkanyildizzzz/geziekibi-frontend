import { HomepageSliderSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteHomepageSlider = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<void>("homepageSlider/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
