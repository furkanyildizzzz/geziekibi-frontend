import { ContactFormSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteContactForm = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<ContactFormSuccessResponse>(
        "contactForm/" + id,
        "DELETE"
      );
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const deleteContactForms = async (ids: number[]): Promise<void> => {
  try {
    if (ids) {
      await apiRequest<ContactFormSuccessResponse>("contactForm/", "DELETE", {
        ids,
      });
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
