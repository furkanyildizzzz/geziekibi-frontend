import { FAQSuccessResponse } from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";

export const deleteFAQ = async (id: number): Promise<void> => {
  try {
    if (id) {
      await apiRequest<FAQSuccessResponse>("faq/" + id, "DELETE");
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};

export const deleteFAQs = async (ids: number[]): Promise<void> => {
  try {
    if (ids) {
      await apiRequest<FAQSuccessResponse>("faq/", "DELETE", { ids });
    }
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
