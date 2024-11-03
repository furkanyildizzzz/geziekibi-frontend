import { ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteService = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<ServiceSuccessResponse>("service/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
