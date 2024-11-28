import { ApiResponse, BlogSuccessResponse } from "@/Types/ApiResponseType";
import { FieldValues } from "react-hook-form";
import { createNewBlog } from "./createNewBlog";

export const editBlog = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<BlogSuccessResponse>> => {
  try {
    return createNewBlog(fieldValues, id);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
