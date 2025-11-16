import type { Ad, Pagination } from "./ad";

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

export interface ListResponse<T> {
  ads: T[];
  pagination: Pagination;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export interface AxiosErrorResponse {
  response?: {
    data: {
      message: string;
      statusCode?: number;
      error?: string;
    };
    status: number;
  };
  message: string;
}

export type MutationError = Error | ApiError | AxiosErrorResponse;

export interface ApproveAdVariables {
  adId: string;
  comment?: string;
}

export interface RejectAdVariables {
  adId: string;
  reason: string;
  comment?: string;
}

export interface ReturnAdVariables {
  adId: string;
  comment?: string;
}

export type ModerationVariables =
  | ApproveAdVariables
  | RejectAdVariables
  | ReturnAdVariables;

export type ModerationResponse = Ad;

export interface ModerationContext {
  previousAd?: Ad;
}
