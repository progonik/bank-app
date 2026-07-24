export interface FoydalanuvchiRow {
  readonly id: string;
  readonly fullName: string;
  readonly role: string;
  readonly login: string;
  readonly createdAt: string;
  readonly status: boolean;
}

export interface FoydalanuvchiFormState {
  full_name: string;
  role: string;
  login: string;
  password: string;
}

export const INITIAL_FORM_STATE: FoydalanuvchiFormState = {
  full_name: "",
  role: "",
  login: "",
  password: "",
};
