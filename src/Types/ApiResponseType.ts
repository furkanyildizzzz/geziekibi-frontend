import { TourServiceTypeEnum } from "@/app/lib/enums";

export type ApiResponse<T = any> = ApiErrorResponse | ApiSuccessResponse<T>;

export interface ApiErrorResponse extends Response {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
}
export type ErrorType =
  | "General"
  | "Raw"
  | "Validation"
  | "Unauthorized"
  | "BAD REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "INTERNAL SERVER ERROR"
  | "METHOD NOT ALLOWED"
  | "NOT FOUND"
  | "REQUEST TIMEOUT";
export type ErrorValidation = { [key: string]: string };

export interface ApiSuccessResponse<T> extends Response {
  message: string;
  data: T;
}

export type UserSuccessResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMINISTRATOR" | "STANDART"; // Adjust roles as necessary
  language: string; // e.g., "en-US", "tr-TR"
};
export type LoginSuccessResponse = {
  accessToken: string;
  user: UserSuccessResponse;
};
export type SignupSuccessResponse = string;
export type TagSuccessResponse = { id: number; name: string };
export type TourCategorySuccessResponse = {
  id: number;
  name: string;
  description: Text;
  parent: TourCategorySuccessResponse;
  subCategories: TourCategorySuccessResponse[];
};
export type TourServiceSuccessResponse = {
  id: number;
  name: string;
  description: string;
  type: TourServiceTypeEnum;
  service: ServiceSuccessResponse;
};
export type ServiceSuccessResponse = {
  id: number;
  name: string;
  description: string;
};
export type CloudinaryImage = {
  originalName: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  createdAt: Date;
};
export type TourService = {
  id: number;
  type: TourServiceTypeEnum;
  service: ServiceSuccessResponse;
};
export type TourSuccessResponse = {
  id: number;
  title: string;
  spot: string;
  body: Text;
  tourType: string;
  primaryImages: CloudinaryImage[];
  galleryImages: CloudinaryImage[];
  publishStatus: string;
  publishDate: Date;
  category: TourCategorySuccessResponse;
  prices: { name: string; description: string; price: number }[];
  tags: TagSuccessResponse[];
  tourServices: TourService[];
};

export type TourListSuccessResponse = {
  id: number;
  title: string;
  spot: string;
  tourType: string;
  primaryImages: CloudinaryImage[];
  publishStatus: string;
  publishDate: Date;
  category: TourCategorySuccessResponse;
  prices: { name: string; description: string; price: number }[];
};

export type TourPriceSuccessResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  rowId: number;
};
