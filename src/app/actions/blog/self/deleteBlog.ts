import {
  ApiErrorResponse,
  ApiResponse,
  BlogSuccessResponse,
  DeleteSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteBlog = async (
  id: number
): Promise<ApiResponse<DeleteSuccessResponse>> => {
  try {
    if (id) {
      return await apiRequest<BlogSuccessResponse>("blog/" + id, "DELETE");
    }
    return {
      errorType: "Validation",
      errorMessage: "Id not provided",
    } as ApiErrorResponse;
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
