import { DOCUMENT_SCHEMA } from "@/app/lib/definitions";
import { ApiErrorResponse, ApiResponse, Catalog, ErrorValidation } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { ZodError } from "zod";

export const uploadCatalogFile = async (
  file: File
): Promise<ApiResponse<Catalog>> => {
  try {
    const data = DOCUMENT_SCHEMA.parse(file);

    const formData = new FormData();
    formData.append("catalogFile", data);

    return await apiRequest<Catalog>("catalog/upload", "POST", formData);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log({error})
      return { errorMessage: error.message, errorType: "BAD REQUEST", errorsValidation: [{ "primaryImages": error.message } as ErrorValidation] } as ApiErrorResponse
    }
    throw error;
  }
};
