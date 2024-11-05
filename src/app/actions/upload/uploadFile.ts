import {
  MULTIPLE_IMAGE_SCHEMA,
  SINGLE_IMAGE_SCHEMA,
} from "@/app/lib/definitions";
import {
  ApiResponse,
  SingleFileUploadSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest, apiRequestFile } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const uploadSingleFile = async (
  file: File
): Promise<ApiResponse<SingleFileUploadSuccessResponse>> => {
  try {
    const data = SINGLE_IMAGE_SCHEMA.parse(file);
    return await apiRequestFile<SingleFileUploadSuccessResponse>(
      "upload/",
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const uploadSingleBase64Image = async (
  base64Image: string
): Promise<ApiResponse<SingleFileUploadSuccessResponse>> => {
  try {
    return await apiRequest<SingleFileUploadSuccessResponse>(
      "upload/base64",
      "POST",
      base64Image
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const uploadMultipleFile = async (
  files: File[]
): Promise<ApiResponse<SingleFileUploadSuccessResponse[]>> => {
  try {
    const data = MULTIPLE_IMAGE_SCHEMA.parse(files);
    return await apiRequestFile<SingleFileUploadSuccessResponse[]>(
      "upload/",
      "POST",
      data
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
