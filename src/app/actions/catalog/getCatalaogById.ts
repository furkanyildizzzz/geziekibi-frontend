import { ApiResponse, Catalog } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const getCatalogById = async (
  id: number
): Promise<ApiResponse<Catalog>> => {
  const response = await apiRequest<Catalog>("catalog/" + id, "GET");
  return response;
};
