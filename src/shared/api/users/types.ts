/**
 * API types for GET /users endpoint.
 * Schema aligned with backend response.
 */

export interface UserProfileEducation {
  readonly id: string;
  readonly degree: string;
  readonly description: string;
  readonly end_date: string;
  readonly field_of_study: string;
  readonly institution: string;
  readonly location: string;
  readonly start_date: string;
}

export interface UserProfileExperienceProject {
  readonly project: string;
  readonly items: readonly string[];
}

export interface UserProfileExperience {
  readonly id: string;
  readonly company: string;
  readonly description: string;
  readonly end_date: string;
  readonly position: string;
  readonly projects: readonly UserProfileExperienceProject[];
  readonly start_date: string;
  readonly web_site: string;
}

export interface UserProfileLanguage {
  readonly name: string;
  readonly level: string;
}

export interface UserProfile {
  readonly about: string;
  readonly achievements: string;
  readonly certifications: readonly string[];
  readonly education: readonly UserProfileEducation[];
  readonly experience: readonly UserProfileExperience[];
  readonly languages: readonly UserProfileLanguage[];
  readonly skills: readonly string[];
  readonly title: string;
}

export interface UserApi {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly patronymic?: string;
  readonly email: string;
  readonly phone: string;
  readonly telegram: string;
  readonly telegram_id: string;
  readonly gender: string;
  readonly nationality: string;
  readonly country: string;
  readonly region: string;
  readonly activity_type: string;
  readonly job_status: string;
  readonly status: string;
  readonly tariff_type: string;
  readonly specializations: readonly string[];
  readonly profile_pic_url: string;
  readonly created_at: string;
  readonly profile?: UserProfile;
}

export interface UsersListParams {
  readonly page: number;
  readonly page_size: number;
  readonly lang: string;
  readonly search?: string;
  readonly category?: string;
  readonly country?: string;
  readonly region?: string;
  readonly status?: string;
}

export interface UsersListResponse {
  readonly page: number;
  readonly page_size: number;
  readonly total: number;
  readonly users: readonly UserApi[];
}
