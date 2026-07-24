"use client";

import type { ReactNode } from "react";
import { TableFilters } from "@shared/ui";

interface UsersFiltersBarProps {
  readonly search: string;
  readonly onSearchChange: (value: string) => void;
  readonly t: (key: string) => string;
  readonly leftSideActions?: ReactNode;
  readonly rightSideActions?: ReactNode;
}

export function UsersFiltersBar({
  search,
  onSearchChange,
  t,
  leftSideActions,
  rightSideActions,
}: UsersFiltersBarProps) {
  return (
    <TableFilters
      search={{
        value: search,
        onChange: onSearchChange,
        placeholder: t("foydalanuvchilar.searchPlaceholder"),
        debounceMs: 300,
      }}
      leftSideActions={leftSideActions}
      rightSideActions={rightSideActions}
    />
  );
}
