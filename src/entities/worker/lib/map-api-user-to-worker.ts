import type { Worker, WorkerStatus, WorkerTariff } from "../model/types";
import type { UserApi } from "@shared/api/users";

const NORMALIZED_STATUS: Record<string, WorkerStatus> = {
  active: "active",
  blocked: "blocked",
  block: "blocked",
};

const NORMALIZED_TARIFF: Record<string, WorkerTariff> = {
  free: "free",
  vip: "vip",
};

const DEFAULT_COUNTRY = "uzbekistan";
const DEFAULT_REGION = "tashkentCity";
const UNDEFINED_SALARY = "undefined";

function normalizeStatus(raw: string): WorkerStatus {
  const lower = raw?.toLowerCase() ?? "";
  return NORMALIZED_STATUS[lower] ?? "active";
}

function normalizeTariff(raw: string): WorkerTariff {
  const lower = raw?.toLowerCase() ?? "";
  return NORMALIZED_TARIFF[lower] ?? "free";
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return iso;
  }
}

/**
 * Maps API user response to domain Worker entity.
 */
export function mapApiUserToWorker(user: UserApi): Worker {
  const fullName = [user.first_name, user.last_name, user.patronymic]
    .filter(Boolean)
    .join(" ")
    .trim() || user.email || user.id;

  const role = user.activity_type || user.job_status || "unemployed";
  const categories = user.specializations ?? [];
  const country = user.country || DEFAULT_COUNTRY;
  const region = user.region || DEFAULT_REGION;

  return {
    id: user.id,
    fullName,
    role,
    avatar: user.profile_pic_url || undefined,
    phone: user.phone || "",
    telegram: user.telegram ? `@${user.telegram.replace(/^@/, "")}` : "",
    categories: Array.isArray(categories) ? [...categories] : [],
    salary: UNDEFINED_SALARY,
    tariff: normalizeTariff(user.tariff_type),
    country,
    region,
    registrationDate: formatDate(user.created_at),
    status: user.status,
  };
}
