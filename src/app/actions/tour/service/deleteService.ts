import { ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteService = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<ServiceSuccessResponse>("tour/service/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const deleteServices = async (ids: number[]): Promise<void> => {
  try {
    if (ids) {
      await apiRequest<ServiceSuccessResponse>("tour/service/", "DELETE", {
        ids,
      });
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
