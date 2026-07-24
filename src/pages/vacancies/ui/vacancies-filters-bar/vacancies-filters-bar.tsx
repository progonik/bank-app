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

interface VacanciesFiltersBarProps {
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

export function VacanciesFiltersBar({
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
}: VacanciesFiltersBarProps) {
  const filters = useMemo<TableFilterSelectConfig[]>(
    () => [
      {
        key: "category",
        label: t("vacancies.category"),
        options: CATEGORY_OPTIONS.filter((o) => o !== "all").map((opt) => ({
          value: opt,
          label: t(`vacancies.categories.${opt}`),
        })),
        value: category,
        onChange: onCategoryChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("vacancies.categoryPlaceholder"),
        className: "w-[200px]!",
      },
      {
        key: "country",
        label: t("vacancies.country"),
        options: COUNTRY_OPTIONS.filter((o) => o !== "all").map((opt) => ({
          value: opt,
          label: t(`vacancies.countries.${opt}`),
        })),
        value: country,
        onChange: onCountryChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("vacancies.countryPlaceholder"),
      },
      {
        key: "region",
        label: t("vacancies.region"),
        options: REGION_OPTIONS.filter((o) => o !== "all").map((opt) => ({
          value: opt,
          label: t(`vacancies.regions.${opt}`),
        })),
        value: region,
        onChange: onRegionChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("vacancies.regionPlaceholder"),
      },
      {
        key: "status",
        label: t("vacancies.status"),
        options: STATUS_OPTIONS.filter((o) => o !== "all").map((opt) => ({
          value: opt,
          label: t(`vacancies.statuses.${opt}`),
        })),
        value: status,
        onChange: onStatusChange,
        allValue: FILTER_ALL,
        allLabel: t("common.all"),
        placeholder: t("vacancies.statusPlaceholder"),
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
        placeholder: t("vacancies.searchPlaceholder"),
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
