import { Catalog } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteCatalog = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<void>("catalog/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
