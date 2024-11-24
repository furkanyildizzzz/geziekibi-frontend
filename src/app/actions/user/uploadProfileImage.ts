import { SINGLE_IMAGE_SCHEMA } from "@/app/lib/definitions";
import { ApiResponse, CloudinaryImage } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const uploadProfileImage = async (
  file: File
): Promise<ApiResponse<CloudinaryImage>> => {
  try {
    const data = SINGLE_IMAGE_SCHEMA.parse(file);

    const formData = new FormData();
    formData.append("profileImage", data);

    return await apiRequest<CloudinaryImage>(
      "user/uploadProfileImage",
      "POST",
      formData
    );
  } catch (error) {
    console.log({ error });
    // Handle any other errors (if necessary)
    throw error;
  }
};
