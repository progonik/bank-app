"use client";

import { useState } from "react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Button,
} from "@shared/ui";
import { cn } from "@shared/lib/utils";
import type { TableFiltersProps } from "./types";
import { useDebouncedValue } from "./use-debounce";

const DEFAULT_SEARCH_MIN_WIDTH = 200;
const DEFAULT_SEARCH_MAX_WIDTH = 250;
const DEFAULT_SELECT_WIDTH = 180;
const DEFAULT_SEARCH_ICON = "/icons/search.svg";
const DEFAULT_FILTER_ICON = "/icons/filter.svg";
const FILTERS_GAP = 16;
const INPUT_HEIGHT = 44;

export function TableFilters({
  search,
  filters = [],
  children,
  leftSideActions,
  rightSideActions,
  defaultFilterPanelOpen = false,
  filterPanelTitle = "Filter",
  filterPanelClearLabel = "Clear",
  onClear,
  filterPanelClassName,
  filterIconClassName,
  filterIconSrc = DEFAULT_FILTER_ICON,
  className,
  searchMinWidth = DEFAULT_SEARCH_MIN_WIDTH,
  searchMaxWidth = DEFAULT_SEARCH_MAX_WIDTH,
  selectWidth = DEFAULT_SELECT_WIDTH,
  searchIconSrc = DEFAULT_SEARCH_ICON,
}: TableFiltersProps) {
  const hasSearch = search != null;
  const searchValue = search?.value ?? "";
  const searchOnChange = search?.onChange ?? (() => {});
  const debounceMs = search?.debounceMs ?? 0;

  const [displaySearchValue, setDisplaySearchValue] = useDebouncedValue(
    searchValue,
    searchOnChange,
    debounceMs
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySearchValue(e.target.value);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(defaultFilterPanelOpen);
  const visibleFilters = filters.filter((f) => !f.hidden && f.collapsible !== true);
  const collapsibleFilters = filters.filter((f) => !f.hidden && f.collapsible === true);
  const hasCollapsibleFilters = collapsibleFilters.length > 0;
  const showFilterPanel = !hasCollapsibleFilters || isFilterOpen;

  return (
    <div
      className={cn("flex flex-col w-full", className)}
      style={{ gap: FILTERS_GAP }}
    >
      <div
        className={cn(
          "flex flex-wrap justify-between items-end w-full",
          hasCollapsibleFilters && "items-center"
        )}
        style={{ gap: FILTERS_GAP }}
      >

        <div
          className="flex flex-wrap items-center"
          style={{ gap: FILTERS_GAP, flex: 1 }}
        >
      {hasSearch && !search.hidden && (
        <div
          className="relative flex-1 min-w-[200px]! max-w-[200px]"
          style={{
            minWidth: searchMinWidth,
            maxWidth: searchMaxWidth,
          }}
        >
          <Input
            placeholder={search.placeholder ?? "Search..."}
            value={displaySearchValue}
            onChange={handleSearchChange}
            className="pl-10 h-11"
            aria-label="Search"
            disabled={search.disabled}
          />
          <img
            src={searchIconSrc}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]"
            aria-hidden
          />
        </div>
      )}

      {visibleFilters.map((filter) => (
        <Select
          key={filter.key}
          value={filter.value}
          onValueChange={filter.onChange}
          disabled={filter.disabled}
        >
          <SelectTrigger
            className={cn("h-11", filter.className)}
            style={{ width: selectWidth, minHeight: INPUT_HEIGHT }}
          >
            <SelectValue placeholder={filter.placeholder ?? filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.allValue != null && (
              <SelectItem value={filter.allValue}>
                {filter.placeholder ?? filter.allLabel ?? "All"}
              </SelectItem>
            )}
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

        {leftSideActions}
        {children}
      </div>

        {rightSideActions && (
        <div className="flex items-center gap-2 shrink-0">

            {hasCollapsibleFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFilterOpen((v) => !v)}
                className={cn(
                  "w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0",
                  filterIconClassName
                )}
                aria-label={showFilterPanel ? "Close filters" : "Open filters"}
                aria-expanded={showFilterPanel}
              >
                <img
                  src={filterIconSrc}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </Button>
            )}
          {rightSideActions}
        </div>
        )}
      </div>

      {hasCollapsibleFilters && showFilterPanel && (
        <div
          className={cn(
            "flex flex-col bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px]",
            filterPanelClassName
          )}
        >
          <div className="flex items-center justify-between px-4 pt-4">
            <span
              className="font-semibold text-base leading-[22px] text-[#000000]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "22px",
                letterSpacing: "-0.007em",
              }}
            >
              {filterPanelTitle}
            </span>
            <div className="flex items-center gap-2">
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="font-medium text-sm leading-5 text-[#475569] underline hover:text-[#334155] transition-colors"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "20px",
                    letterSpacing: "-0.006em",
                  }}
                >
                  {filterPanelClearLabel}
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="p-1 -m-1 rounded hover:bg-[#E2E8F0] transition-colors"
                aria-label="Close filter panel"
              >
                <img
                  src="/icons/x.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-70"
                  aria-hidden
                />
              </button>
            </div>
          </div>
          <div
            className="flex flex-wrap items-center gap-4 px-4 pb-4 pt-2"
            style={{ gap: FILTERS_GAP }}
          >
            {collapsibleFilters.map((filter) => (
              <Select
                key={filter.key}
                value={filter.value}
                onValueChange={filter.onChange}
                disabled={filter.disabled}
              >
                <SelectTrigger
                  className={cn("h-11", filter.className)}
                  style={{ width: selectWidth, minHeight: INPUT_HEIGHT }}
                >
                  <SelectValue placeholder={filter.placeholder ?? filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.allValue != null && (
                    <SelectItem value={filter.allValue}>
                      {filter.placeholder ?? filter.allLabel ?? "All"}
                    </SelectItem>
                  )}
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
