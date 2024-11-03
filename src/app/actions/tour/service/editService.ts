import { CreateTourCategoryFormSchema } from "@/app/lib/definitions";
import { ApiResponse, ServiceSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const editService = async (
  id: number,
  formData: FieldValues
): Promise<ApiResponse<ServiceSuccessResponse>> => {
  try {
    const data = CreateTourCategoryFormSchema.parse(formData);
    return await apiRequest<ServiceSuccessResponse>(
      "tour/service/" + id,
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
