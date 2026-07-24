"use client";

import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  DateInput,
} from "@shared/ui";
import { useDebouncedValue } from "@shared/ui/table-filters/use-debounce";
import { FILTER_ALL } from "../../model/constants";
import type { TranslateFn } from "../../model/types";
import { IFUT_OPTIONS, CITY_OPTIONS } from "../../model/filter-options";
import { FilterToolbarActions } from "../shared";
import {
  INPUT_BASE_CLASS,
  SEARCH_INPUT_MIN_WIDTH,
} from "../shared/constants";
import { SEARCH_DEBOUNCE_MS, FILTER_BAR_GAP_PX } from "../../model/constants";

interface EntrepreneursFiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  ifutCode: string;
  onIfutCodeChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  t: TranslateFn;
  leftSideActions?: ReactNode;
  rightSideActions?: ReactNode;
  onRefresh?: () => void;
  onConfirm?: () => void;
}

function buildSelectOptions(
  options: readonly { value: string; label: string }[],
  allLabel: string
) {
  return options.map((o) => ({
    value: o.value,
    label: o.value === FILTER_ALL ? allLabel : o.label,
  }));
}

export function EntrepreneursFiltersBar({
  search,
  onSearchChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  ifutCode,
  onIfutCodeChange,
  city,
  onCityChange,
  t,
  leftSideActions,
  rightSideActions,
  onRefresh,
  onConfirm,
}: EntrepreneursFiltersBarProps) {
  const [displaySearch, setDisplaySearch] = useDebouncedValue(
    search,
    onSearchChange,
    SEARCH_DEBOUNCE_MS
  );

  const ifutOptions = useMemo(
    () => buildSelectOptions(IFUT_OPTIONS, t("common.all")),
    [t]
  );

  const cityOptions = useMemo(
    () => buildSelectOptions(CITY_OPTIONS, t("common.all")),
    [t]
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplaySearch(e.target.value);
    },
    [setDisplaySearch]
  );

  return (
    <div
      className="flex flex-wrap items-center w-full"
      style={{ gap: FILTER_BAR_GAP_PX }}
    >
      <div
        className="relative shrink-0 w-[250px]! min-w-[250px]! max-w-[250px]!"
      >
        <Input
          placeholder={t("entrepreneurs.searchPlaceholder")}
          value={displaySearch}
          onChange={handleSearchInputChange}
          className={`pl-10! w-full! ${INPUT_BASE_CLASS}`}
        />
        <img
          src="/icons/search.svg"
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none"
          aria-hidden
        />
      </div>

      <div className="flex items-center gap-0">
        <DateInput
          value={dateFrom}
          onChange={onDateFromChange}
          placeholder={t("entrepreneurs.dateFrom")}
          className="rounded-r-none border-r-0"
        />
        <DateInput
          value={dateTo}
          onChange={onDateToChange}
          placeholder={t("entrepreneurs.dateTo")}
          className="rounded-l-none"
        />
      </div>

      <Select value={ifutCode} onValueChange={onIfutCodeChange}>
        <SelectTrigger
          className={`h-11 w-[180px] shrink-0 ${INPUT_BASE_CLASS}`}
        >
          <SelectValue placeholder={t("entrepreneurs.ifutCode")} />
        </SelectTrigger>
        <SelectContent>
          {ifutOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={city} onValueChange={onCityChange}>
        <SelectTrigger
          className={`h-11 w-[180px] shrink-0 ${INPUT_BASE_CLASS}`}
        >
          <SelectValue placeholder={t("entrepreneurs.city")} />
        </SelectTrigger>
        <SelectContent>
          {cityOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {leftSideActions}

      <FilterToolbarActions
        onRefresh={onRefresh}
        onConfirm={onConfirm}
        confirmLabel={t("entrepreneurs.confirm")}
        refreshAriaLabel={t("common.synchronize")}
        rightSideActions={rightSideActions}
      />
    </div>
  );
}
