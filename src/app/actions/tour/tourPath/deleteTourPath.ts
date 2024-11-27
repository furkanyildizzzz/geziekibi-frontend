import { TourPathSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteTourPath = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<TourPathSuccessResponse>("tour/path/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
