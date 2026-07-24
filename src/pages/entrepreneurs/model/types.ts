export type TranslateFn = (key: string) => string;

export interface EntrepreneurFormState {
  inn: string;
  legal_name: string;
  registration_authority: string;
  registration_date: string;
  registration_number: string;
  legal_form: string;
  ifut_code: string;
  dbibt_code: number;
  activity_status: boolean;
  charter_fund: number;
  founders: string;
  email: string;
  phone: string;
  mhobt_code: string;
  address: string;
  director_name: string;
}

export const INITIAL_FORM_STATE: EntrepreneurFormState = {
  inn: "",
  legal_name: "",
  registration_authority: "davlat_xizmatlari",
  registration_date: "",
  registration_number: "0",
  legal_form: "152",
  ifut_code: "",
  dbibt_code: 0,
  activity_status: true,
  charter_fund: 0,
  founders: "",
  email: "",
  phone: "+998",
  mhobt_code: "",
  address: "",
  director_name: "",
} as const;
