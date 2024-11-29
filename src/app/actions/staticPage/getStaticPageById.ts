import {
  ApiResponse,
  StaticPageSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getStaticPageById = async (
  id: number
): Promise<ApiResponse<StaticPageSuccessResponse>> => {
  const response = await apiRequest<StaticPageSuccessResponse>(
    "staticPage/" + id,
    "GET"
  );
  return response;
};
