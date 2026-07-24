export interface CityApi {
  readonly id: string;
  readonly name: string;
  readonly created_at: string;
}

export interface CitiesListParams {
  readonly name?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface CitiesListResponse {
  readonly cities: readonly CityApi[];
  readonly limit: number;
  readonly offset: number;
  readonly total: number;
}

export interface CityCreateData {
  readonly name: string;
}
