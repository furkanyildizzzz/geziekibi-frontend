import { ApiResponse, BlogSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest, apiRequestWithToken } from "@/utils/ApiRequest";
import { cookies } from "next/headers";

export const getBlogById = async (
  id: number
): Promise<ApiResponse<BlogSuccessResponse>> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const response = await apiRequestWithToken<BlogSuccessResponse>(
    "blog/" + id,
    "GET",
    token!
  );
  return response;
};
