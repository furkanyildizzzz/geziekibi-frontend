import { TagSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteTag = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<TagSuccessResponse>("tag/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const deleteTags = async (ids: number[]): Promise<void> => {
  try {
    if (ids) {
      await apiRequest<TagSuccessResponse>("tag/", "DELETE", { ids });
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
