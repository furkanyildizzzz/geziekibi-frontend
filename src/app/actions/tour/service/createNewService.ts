import { CreateServiceFormSchema } from "@/app/lib/definitions";
import { ApiResponse, ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewService = async (
  formData: FieldValues
): Promise<ApiResponse<ServiceSuccessResponse>> => {
  try {
    const data = CreateServiceFormSchema.parse(formData);
    return await apiRequest<ServiceSuccessResponse>(
      "tour/service/",
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
