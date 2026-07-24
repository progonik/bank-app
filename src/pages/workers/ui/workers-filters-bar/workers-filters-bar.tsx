"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { TableFilters } from "@shared/ui";
import type { TableFilterSelectConfig } from "@shared/ui";
import {
  FILTER_ALL,
  CATEGORY_OPTIONS,
  COUNTRY_OPTIONS,
  REGION_OPTIONS,
  STATUS_OPTIONS,
} from "../../model/constants";

const SEARCH_DEBOUNCE_MS = 300;

export type TranslateFn = (key: string) => string;

interface WorkersFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  country: string;
  onCountryChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  t: TranslateFn;
  leftSideActions?: ReactNode;
  rightSideActions?: ReactNode;
  defaultFilterPanelOpen?: boolean;
  filterPanelClassName?: string;
  filterIconClassName?: string;
  onClear?: () => void;
}

export function WorkersFiltersBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  country,
  onCountryChange,
  region,
  onRegionChange,
  status,
  onStatusChange,
  t,
  leftSideActions,
  rightSideActions,
  defaultFilterPanelOpen = false,
  filterPanelClassName,
  filterIconClassName,
  onClear,
}: WorkersFiltersBarProps) {
  const filters = useMemo<TableFilterSelectConfig[]>(
    () => [
      {
        key: "category",
        label: t("workers.category"),
        options: CATEGORY_OPTIONS.map((opt) => ({
          value: opt,
          label: t(`workers.categories.${opt}`),
        })),
        value: category,
        onChange: onCategoryChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("workers.categoryPlaceholder"),
        className: "w-[200px]!",
      },
      {
        key: "country",
        label: t("workers.country"),
        options: COUNTRY_OPTIONS.map((opt) => ({
          value: opt,
          label: t(`workers.countries.${opt}`),
        })),
        value: country,
        onChange: onCountryChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("workers.countryPlaceholder"),
      },
      {
        key: "region",
        label: t("workers.region"),
        options: REGION_OPTIONS.map((opt) => ({
          value: opt,
          label: t(`workers.regions.${opt}`),
        })),
        value: region,
        onChange: onRegionChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("workers.regionPlaceholder"),
      },
      {
        key: "status",
        label: t("workers.status"),
        options: STATUS_OPTIONS.map((opt) => ({
          value: opt,
          label: opt === "active" ? t("common.active") : t("common.block"),
        })),
        value: status,
        onChange: onStatusChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("workers.statusPlaceholder"),
      },
    ],
    [
      t,
      category,
      onCategoryChange,
      country,
      onCountryChange,
      region,
      onRegionChange,
      status,
      onStatusChange,
    ]
  );

  return (
    <TableFilters
      search={{
        value: search,
        onChange: onSearchChange,
        placeholder: t("workers.searchPlaceholder"),
        debounceMs: SEARCH_DEBOUNCE_MS,
      }}
      filters={filters}
      leftSideActions={leftSideActions}
      rightSideActions={rightSideActions}
      defaultFilterPanelOpen={defaultFilterPanelOpen}
      filterPanelTitle={t("common.filter")}
      filterPanelClearLabel={t("common.clear")}
      onClear={onClear}
      filterPanelClassName={filterPanelClassName}
      filterIconClassName={filterIconClassName}
    />
  );
}
