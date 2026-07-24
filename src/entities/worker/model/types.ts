export type WorkerStatus = "active" | "blocked";
export type WorkerTariff = "free" | "vip";

export interface Worker {
  id: string;
  fullName: string;
  role: string;
  profile_pic_url?: string;
  phone: string;
  telegram: string;
  categories: string[];
  salary: string;
  tariff: WorkerTariff;
  country: string;
  region: string;
  registrationDate: string;
  status: WorkerStatus;
}
