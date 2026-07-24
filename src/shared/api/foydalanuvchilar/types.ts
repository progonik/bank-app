export interface FoydalanuvchiApi {
  readonly id: string;
  readonly full_name: string;
  readonly login: string;
  readonly role: string;
  readonly status: boolean;
  readonly created_at: string;
}

export interface FoydalanuvchilarListParams {
  readonly full_name?: string;
  readonly role?: string;
  readonly login?: string;
  readonly status?: boolean;
  readonly created_from?: string;
  readonly created_to?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface FoydalanuvchilarListResponse {
  readonly limit: number;
  readonly offset: number;
  readonly total: number;
  readonly users: readonly FoydalanuvchiApi[];
}

export interface FoydalanuvchiCreateData {
  readonly full_name: string;
  readonly login: string;
  readonly password: string;
  readonly role: string;
}

export interface FoydalanuvchiUpdateData {
  readonly full_name?: string;
  readonly role?: string;
  readonly login?: string;
  readonly password?: string;
  readonly status?: boolean;
}
