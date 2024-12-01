import { DOCUMENT_SCHEMA } from "@/app/lib/definitions";
import { ApiResponse, Catalog } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const uploadCatalogFile = async (
  file: File
): Promise<ApiResponse<Catalog>> => {
  try {
    const data = DOCUMENT_SCHEMA.parse(file);

    const formData = new FormData();
    formData.append("catalogFile", data);

    return await apiRequest<Catalog>("catalog/upload", "POST", formData);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
