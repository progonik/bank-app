export const PAGE_SIZES = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;
export const FILTER_ALL = "all" as const;

export const CATEGORY_OPTIONS = [
  "all",
  "design",
  "development",
  "sales",
  "administration",
] as const;

export const COUNTRY_OPTIONS = ["all", "uzbekistan"] as const;

export const REGION_OPTIONS = ["all", "tashkent", "andijan", "samarkand"] as const;

export const STATUS_OPTIONS = ["all", "active", "inactive", "closed"] as const;
