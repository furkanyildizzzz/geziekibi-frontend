import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from "@/Types/ApiResponseType";
import Cookies from "js-cookie";
import { isTokenExpired } from "./IsTokenExpired";
import { useRouter } from "next/router";

const IsErrorResponse = (obj: Response): obj is ApiErrorResponse => {
  console.log({ obj });
  return "errorType" in obj;
};

export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const token = Cookies.get("token"); // Replace 'yourTokenKey' with your actual key

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://localhost:4000/v1/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = await processApiResponse<T>(response);

    return result;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}

export async function apiRequestFile<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: File | File[]
): Promise<ApiResponse<T>> {
  try {
    const token = Cookies.get("token");

    const headers: HeadersInit = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    let bodyContent: BodyInit | null = null;

    // Handle file or array of files
    const formData = new FormData();
    if (Array.isArray(body)) {
      body.forEach((file, index) => formData.append(`file${index}`, file));
    } else {
      formData.append("file", body as File);
    }
    bodyContent = formData;

    const response = await fetch(`http://localhost:4000/v1/${url}`, {
      method,
      headers,
      body: bodyContent,
    });

    const result = await processApiResponse<T>(response);

    return result;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}

async function processApiResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  const result = await response.json();
  if (response.ok) {
    return result as ApiSuccessResponse<T>;
  } else {
    return result as ApiErrorResponse;
  }
}
