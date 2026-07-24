export const PAGE_SIZES = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;
export const SCROLL_HEIGHT = 900;
export const FILTER_ALL = "all" as const;

export const SEARCH_DEBOUNCE_MS = 300;
export const FILTER_BAR_GAP_PX = 16;
export const TABLE_MIN_WIDTH_PX = 1200;
export const DIALOG_MIN_WIDTH_PX = 958;

export const VISIBLE_COLUMNS_STORAGE_KEY = "entrepreneurs-visible-columns";

export const DEFAULT_VISIBLE_COLUMN_KEYS = [
  "createdAt",
  "inn",
  "legalName",
  "registrationAuthority",
  "registrationDate",
  "registrationNumber",
  "legalForm",
  "ifutCode",
  "dbibtCode",
] as const;

export const SEARCH_INPUT_WIDTH = 200;
export const SELECT_WIDTH = 180;
export const ICON_BUTTON_SIZE = 44;
export const FORM_LABEL_WIDTH = 180;
export const FORM_COLUMN_GAP = 60;
export const FORM_ROW_GAP = 12;
export const FILTER_BAR_BG = "rgb(241 245 249)";
