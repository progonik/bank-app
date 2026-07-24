/**
 * API types for GET /vacancies endpoint.
 * Schema aligned with backend response.
 */

export interface VacancyText {
  readonly benefits?: string;
  readonly description?: string;
  readonly is_source?: boolean;
  readonly lang?: string;
  readonly model_version?: string;
  readonly requirements?: string;
  readonly responsibilities?: string;
  readonly title?: string;
  readonly updated_at?: string;
}

export interface VacancySkill {
  readonly id: string;
  readonly name: string;
}

export interface VacancyApi {
  readonly id: string;
  readonly address?: string;
  readonly company_id: string;
  readonly created_at: string;
  readonly email?: string;
  readonly experience_max?: number;
  readonly experience_min?: number;
  readonly format?: string;
  readonly hr_id?: string;
  readonly phone?: string;
  readonly salary_currency?: string;
  readonly salary_max?: number;
  readonly salary_min?: number;
  readonly schedule?: string;
  readonly skills?: readonly VacancySkill[];
  readonly source_lang?: string;
  readonly status: string;
  readonly telegram?: string;
  readonly texts?: readonly VacancyText[];
}

export interface VacanciesListParams {
  readonly page: number;
  readonly page_size: number;
  readonly company_id?: string;
}

export interface VacanciesListResponse {
  readonly page: number;
  readonly page_size: number;
  readonly total: number;
  readonly vacancies: readonly VacancyApi[];
}
