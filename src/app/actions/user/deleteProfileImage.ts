import { SINGLE_IMAGE_SCHEMA } from "@/app/lib/definitions";
import { ApiResponse, CloudinaryImage } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteProfileImage = async (
  publicId: string
): Promise<ApiResponse<CloudinaryImage>> => {
  try {
    return await apiRequest<CloudinaryImage>(
      "user/deleteProfileImage",
      "POST",
      { publicId }
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
