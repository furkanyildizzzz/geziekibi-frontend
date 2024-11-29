import { PageTypeEnum } from "@/app/lib/enums";
import {
  ApiResponse,
  StaticPageSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getStaticPageByType = async (
  pageType: PageTypeEnum
): Promise<ApiResponse<StaticPageSuccessResponse>> => {
  const response = await apiRequest<StaticPageSuccessResponse>(
    "staticPage/pageType?type=" + pageType.toString(),
    "GET"
  );
  return response;
};
