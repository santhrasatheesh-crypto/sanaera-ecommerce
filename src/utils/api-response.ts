export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export function successResponse<T>(
  data: T,
  message = 'Success'
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  error: string,
  errors?: Record<string, string[]>
): ApiResponse {
  return {
    success: false,
    error,
    errors,
  };
}
