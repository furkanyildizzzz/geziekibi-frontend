import { SigninFormSchema, SigninSchema } from "@/app/lib/definitions";
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  ErrorValidation,
  LoginSuccessResponse,
} from "@/Types/ApiResponseType";
import { apiRequest } from "@/utils/ApiRequest";
import { validateForm } from "@/utils/ValidateForm";
import { ZodError } from "zod";

export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    // If validation is successful, proceed with the API request
    const response = await apiRequest<void>("auth/logout", "POST");

    return response;
  } catch (error) {
    // Handle any other errors (if necessary)
    throw error;
  }
};
