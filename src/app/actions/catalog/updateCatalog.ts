import {
  ApiResponse,
  Catalog,
  UserSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const updateCatalog = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<Catalog>> => {
  const response = await apiRequest<Catalog>(
    "catalog/" + id,
    "POST",
    fieldValues
  );

  return response;
};
