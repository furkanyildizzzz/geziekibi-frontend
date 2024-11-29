import {
  ApiErrorResponse,
  ApiResponse,
  StaticPageSuccessResponse,
  DeleteSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteStaicPage = async (
  id: number
): Promise<ApiResponse<DeleteSuccessResponse>> => {
  try {
    if (id) {
      return await apiRequest<StaticPageSuccessResponse>(
        "staticPage/" + id,
        "DELETE"
      );
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
