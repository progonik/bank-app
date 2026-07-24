import {
  DEFAULT_VISIBLE_COLUMN_KEYS,
  VISIBLE_COLUMNS_STORAGE_KEY,
} from "./constants";

function getDefaultVisibleColumns(): Set<string> {
  return new Set(DEFAULT_VISIBLE_COLUMN_KEYS);
}

export function loadVisibleColumns(): Set<string> {
  if (typeof window === "undefined") {
    return getDefaultVisibleColumns();
  }

  try {
    const raw = localStorage.getItem(VISIBLE_COLUMNS_STORAGE_KEY);
    if (!raw) {
      return getDefaultVisibleColumns();
    }

    const parsed: unknown = JSON.parse(raw);
    if (
      !Array.isArray(parsed) ||
      !parsed.every((key) => typeof key === "string")
    ) {
      return getDefaultVisibleColumns();
    }

    return new Set(parsed);
  } catch {
    return getDefaultVisibleColumns();
  }
}

export function saveVisibleColumns(columns: Set<string>): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    VISIBLE_COLUMNS_STORAGE_KEY,
    JSON.stringify([...columns])
  );
}
