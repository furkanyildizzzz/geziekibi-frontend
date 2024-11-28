import { BlogCategorySuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteBlogCategory = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<BlogCategorySuccessResponse>(
        "blog/category/" + id,
        "DELETE"
      );
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
