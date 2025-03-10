import {
  MULTIPLE_IMAGE_SCHEMA,
  SINGLE_IMAGE_SCHEMA,
} from "@/app/lib/definitions";
import { ApiResponse, CloudinaryImage } from "@/Types/ApiResponseType";
import { apiRequest, apiRequestFile } from "@/utils/ApiRequest";
import { FieldValues } from "react-hook-form";

export const uploadSingleFile = async (
  url: string,
  file: File
): Promise<ApiResponse<CloudinaryImage>> => {
  try {
    const data = SINGLE_IMAGE_SCHEMA.parse(file);
    return await apiRequestFile<CloudinaryImage>(url, "POST", data);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const uploadSingleBase64Image = async (
  base64Image: string
): Promise<ApiResponse<CloudinaryImage>> => {
  try {
    return await apiRequest<CloudinaryImage>(
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
  url: string,
  files: File[]
): Promise<ApiResponse<CloudinaryImage[]>> => {
  try {
    const data = MULTIPLE_IMAGE_SCHEMA.parse(files);
    return await apiRequestFile<CloudinaryImage[]>(url, "POST", data);
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
