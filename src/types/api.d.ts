import { PATHS } from '@/constants/api';

declare global {
  type PATH = keyof typeof PATHS;

  type ApiError = Record<string, string | string[]>;

  type ApiResponse<T = unknown, E = ApiError> = {
    success: boolean;
    data: T | null;
    statusCode: number | null | undefined;
    error: E | null;
  };

  type PaginationResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };
}
