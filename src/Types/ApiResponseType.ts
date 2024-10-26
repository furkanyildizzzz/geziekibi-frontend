export type ApiResponse<T = any> = ApiErrorResponse | ApiSuccessResponse<T>;

export interface ApiErrorResponse extends Response {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
}
type ErrorType =
  | "General"
  | "Raw"
  | "Validation"
  | "Unauthanticated"
  | "Unauthorized";
export type ErrorValidation = { [key: string]: string };

export interface ApiSuccessResponse<T> extends Response {
  message: string;
  data: T;
}

export type LoginSuccessResponse = string;
export type SignupSuccessResponse = string;

export type TagSuccessResponse = { id: number; name: string };
