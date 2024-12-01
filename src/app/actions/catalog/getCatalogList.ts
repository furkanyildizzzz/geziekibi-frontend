import { ApiResponse, Catalog } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getCatalogList = async (): Promise<ApiResponse<Catalog[]>> => {
  const response = await apiRequest<Catalog[]>("catalog/", "GET");
  return response;
};
