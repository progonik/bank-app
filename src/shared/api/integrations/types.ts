export type IntegrationUserApi = {
  id: string;
  user_id: string;
  role: string;
  user_full_name: string;
  user_login: string;
  user_role: string;
  user_status: boolean;
  created_at: string;
};

export type IntegrationApi = {
  id: string;
  code: string;
  name: string;
  active: boolean;
  active_until: string | null;
  is_usable: boolean;
  users: IntegrationUserApi[];
  created_at: string;
  updated_at: string;
};

export type IntegrationsListResponse = {
  integrations: IntegrationApi[];
};

export type IntegrationUpdateData = {
  active: boolean;
  active_until: string | null;
};
