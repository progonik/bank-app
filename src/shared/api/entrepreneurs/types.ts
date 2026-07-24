/**
 * API types for /entrepreneurs endpoint.
 */

export interface EntrepreneurApi {
  readonly id: string;
  readonly inn_id: string;
  readonly inn_name: string;
  readonly legal_name: string;
  readonly registration_authority: string;
  readonly registration_date: string;
  readonly registration_number: string;
  readonly legal_form: string;
  readonly ifut_code_id: string;
  readonly ifut_code_name: string;
  readonly dbibt_code: number;
  readonly activity_status: boolean;
  readonly charter_fund: number;
  readonly founders: string;
  readonly email: string;
  readonly phone: string;
  readonly mhobt_code: string;
  readonly address: string;
  readonly director_name: string;
  readonly created_at: string;
}

export interface EntrepreneurPostData {
  readonly inn: string;
  readonly phone: string;
  readonly email: string;
  readonly registration_date: string;
  readonly legal_name?: string;
  readonly legal_form?: string;
  readonly ifut_code?: string;
  readonly mhobt_code?: string;
  readonly director_name?: string;
}

export interface EntrepreneursListParams {
  readonly legal_name?: string;
  readonly inn_name?: string;
  readonly activity_status?: boolean;
  readonly director_name?: string;
  readonly date_from?: string;
  readonly date_to?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface EntrepreneursListResponse {
  readonly entrepreneurs: readonly EntrepreneurApi[];
  readonly limit: number;
  readonly offset: number;
  readonly total: number;
}
