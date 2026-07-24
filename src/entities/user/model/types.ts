export interface UserData {
  id: string;
  full_name: string;
  position: string;
  role_name: string;
  login: string;
  avatar?: string;
}

export interface UserRoleData {
  id: string;
  name: string;
  privileges: Record<
    string,
    Record<string, { read: boolean; add_or_edit: boolean; delete: boolean }>
  >;
}
