import {
  ApiResponse,
  StaticPageListSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getStaticPageList = async (): Promise<
  ApiResponse<StaticPageListSuccessResponse[]>
> => {
  const response = await apiRequest<StaticPageListSuccessResponse[]>(
    "staticPage/",
    "GET"
  );
  return response;
};
