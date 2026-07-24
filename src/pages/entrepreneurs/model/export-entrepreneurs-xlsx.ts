import * as XLSX from "xlsx";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";

const COLUMN_EXTRACTORS: Record<string, (e: EntrepreneurApi) => string | number> = {
  inn: (e) => e.inn_name || e.inn_id || "",
  legalName: (e) => e.legal_name ?? "",
  registrationAuthority: (e) => e.registration_authority ?? "",
  registrationDate: (e) => formatDate(e.registration_date),
  registrationNumber: (e) => e.registration_number ?? "",
  legalForm: (e) => e.legal_form ?? "",
  ifutCode: (e) => (e.ifut_code_name != null ? e.ifut_code_name : ""),
  dbibtCode: (e) => (e.dbibt_code != null ? e.dbibt_code : ""),
  activityStatus: (e) => (e.activity_status ? "true" : "false"),
  charterFund: (e) => (e.charter_fund != null ? e.charter_fund : ""),
  founders: (e) => e.founders ?? "",
  email: (e) => e.email ?? "",
  phone: (e) => e.phone ?? "",
  mhobtCode: (e) => e.mhobt_code ?? "",
  address: (e) => e.address ?? "",
  directorName: (e) => e.director_name ?? "",
  createdAt: (e) => formatDate(e.created_at),
};

function formatDate(dateStr: string | undefined): string {
  if (!dateStr?.trim()) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function exportEntrepreneursToXlsx(
  entrepreneurs: EntrepreneurApi[],
  visibleColumnKeys: Set<string>,
  columnLabels: Record<string, string>
): XLSX.WorkBook {
  const keys = Array.from(visibleColumnKeys).filter((k) => COLUMN_EXTRACTORS[k]);
  const headers = keys.map((k) => columnLabels[k] ?? k);
  const rows = entrepreneurs.map((e) =>
    keys.map((k) => COLUMN_EXTRACTORS[k]?.(e) ?? "")
  );
  const data = [headers, ...rows];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Entrepreneurs");

  return wb;
}

export function downloadXlsx(wb: XLSX.WorkBook, filename: string): void {
  XLSX.writeFile(wb, filename);
}
