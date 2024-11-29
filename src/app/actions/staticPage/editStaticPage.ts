import {
  ApiResponse,
  StaticPageSuccessResponse,
} from "@/Types/ApiResponseType";
import { FieldValues } from "react-hook-form";
import { createNewStaticPage } from "./createNewStaticPage";
import { apiRequest } from "@/utils/ApiRequest";

export const editStaticPage = async (
  id: number,
  fieldValues: FieldValues
): Promise<ApiResponse<StaticPageSuccessResponse>> => {
  try {
    return await apiRequest<StaticPageSuccessResponse>(
      "staticPage/" + id,
      "POST",
      fieldValues
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
