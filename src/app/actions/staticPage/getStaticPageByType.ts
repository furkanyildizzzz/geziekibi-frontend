import { PageTypeEnum } from "@/app/lib/enums";
import {
  ApiResponse,
  StaticPageSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequestWithToken } from "@/utils/ApiRequest";
import { cookies } from "next/headers";

export const getStaticPageByType = async (
  pageType: PageTypeEnum
): Promise<ApiResponse<StaticPageSuccessResponse>> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const response = await apiRequestWithToken<StaticPageSuccessResponse>(
    "staticPage/pageType?type=" + pageType.toString(),
    "GET",
    token!
  );
  return response;
};
