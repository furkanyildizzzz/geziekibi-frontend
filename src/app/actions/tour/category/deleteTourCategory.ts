import { TourCategorySuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteTourCategory = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<TourCategorySuccessResponse>(
        "tour/category/" + id,
        "DELETE"
      );
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
