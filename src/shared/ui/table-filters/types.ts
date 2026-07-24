import type { ReactNode } from "react";

export interface TableFilterOption {
  readonly value: string;
  readonly label: string;
}

export interface TableFilterSelectConfig {
  readonly key: string;
  readonly label: string;
  readonly options: readonly TableFilterOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  /** Value for "All" option. If set, adds "All" as first option. */
  readonly allValue?: string;
  readonly allLabel?: string;
  /** Placeholder when no value selected. Falls back to label. */
  readonly placeholder?: string;
  /** When true, this filter is inside the collapsible panel (filter icon toggles it). */
  readonly collapsible?: boolean;
  /** className for the filter's Select trigger/container. */
  readonly className?: string;
  readonly disabled?: boolean;
  /** Hide this filter (e.g. for conditional visibility). */
  readonly hidden?: boolean;
}

export interface TableFilterSearchConfig {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  /** Debounce ms. If set, debounces onChange. */
  readonly debounceMs?: number;
  readonly disabled?: boolean;
  readonly hidden?: boolean;
}

export interface TableFiltersProps {
  /** Search input config. Omit to hide search. */
  readonly search?: TableFilterSearchConfig;
  /** Select/dropdown filters. */
  readonly filters?: readonly TableFilterSelectConfig[];
  /** Custom filter elements (e.g. date picker, custom dropdown). */
  readonly children?: ReactNode;
  /** Actions on the left (e.g. upload button), after search/filters. */
  readonly leftSideActions?: ReactNode;
  /** Actions on the right (e.g. column visibility, export). */
  readonly rightSideActions?: ReactNode;
  /** When any filter has collapsible:true, initial panel open state. Default false = hidden. */
  readonly defaultFilterPanelOpen?: boolean;
  /** Title for the filter panel header (e.g. "Filter"). */
  readonly filterPanelTitle?: string;
  /** Label for the Clear button in the filter panel (e.g. "Tozalash"). */
  readonly filterPanelClearLabel?: string;
  /** Called when Clear is clicked. Reset collapsible filters here. */
  readonly onClear?: () => void;
  /** className for the filter panel wrapper when expanded. */
  readonly filterPanelClassName?: string;
  /** className for the filter icon toggle button. */
  readonly filterIconClassName?: string;
  /** Filter icon path. */
  readonly filterIconSrc?: string;
  readonly className?: string;
  /** Min width for search input. */
  readonly searchMinWidth?: number;
  /** Max width for search input. */
  readonly searchMaxWidth?: number;
  /** Width for each select. */
  readonly selectWidth?: number;
  /** Search icon path. */
  readonly searchIconSrc?: string;
}
