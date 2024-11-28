import { CreateBlogCategoryFormSchema } from "@/app/lib/definitions";
import {
  ApiResponse,
  BlogCategorySuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const createNewBlogCategory = async (
  formData: FieldValues
): Promise<ApiResponse<BlogCategorySuccessResponse>> => {
  try {
    const data = CreateBlogCategoryFormSchema.parse(formData);
    return await apiRequest<BlogCategorySuccessResponse>(
      "blog/category/",
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
