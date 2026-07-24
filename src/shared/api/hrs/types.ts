/**
 * API types for GET /hrs endpoint.
 * Schema aligned with backend response.
 */

export interface HrApi {
  readonly id: string;
  readonly company_id: string;
  readonly created_at: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly patronymic?: string;
  readonly phone: string;
  readonly position: string;
  readonly status: string;
  readonly telegram: string;
  readonly telegram_id: string;
}

export interface HrsListParams {
  readonly page: number;
  readonly page_size: number;
  readonly search?: string;
  readonly category?: string;
  readonly country?: string;
  readonly region?: string;
  readonly status?: string;
}

export interface HrsListResponse {
  readonly hrs: readonly HrApi[];
  readonly page: number;
  readonly page_size: number;
  readonly total: number;
}
