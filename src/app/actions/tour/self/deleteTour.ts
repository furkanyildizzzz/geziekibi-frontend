import { TourSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteTour = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<TourSuccessResponse>("tour/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
