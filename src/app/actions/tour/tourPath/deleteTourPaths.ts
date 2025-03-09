import { TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteTourPaths = async (ids: number[]): Promise<void> => {
  try {
    if (ids) {
      await apiRequest<TourPathSuccessResponse>("tour/path/", "DELETE", { ids });
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};