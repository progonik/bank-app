"use client";

import { useState } from "react";
import { Button, Checkbox, Popover, PopoverTrigger, PopoverContent } from "@shared/ui";
import type { DataTableColumn } from "@shared/ui/data-table";

interface ColumnVisibilityFilterProps<T> {
  columns: DataTableColumn<T>[];
  visibleColumns: Set<string>;
  onVisibilityChange: (visibleColumns: Set<string>) => void;
  label?: string;
  /** Custom label resolver for each column. Falls back to title or key. */
  getColumnLabel?: (column: DataTableColumn<T>) => string;
}

export function ColumnVisibilityFilter<T>({
  columns,
  visibleColumns,
  onVisibilityChange,
  label = "Column visibility",
  getColumnLabel,
}: ColumnVisibilityFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleColumn = (columnKey: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(columnKey)) {
      newVisibleColumns.delete(columnKey);
    } else {
      newVisibleColumns.add(columnKey);
    }
    onVisibilityChange(newVisibleColumns);
  };

  const handleToggleAll = () => {
    const allKeys = new Set(columns.map((col) => col.key));
    const allSelected = columns.every((col) => visibleColumns.has(col.key));

    if (allSelected) {
      onVisibilityChange(new Set());
    } else {
      onVisibilityChange(allKeys);
    }
  };

  const allSelected = columns.length > 0 && columns.every((col) => visibleColumns.has(col.key));
  const someSelected =
    columns.some((col) => visibleColumns.has(col.key)) && !allSelected;
  const selectAllChecked =
    allSelected ? true : (someSelected ? "indeterminate" : false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-11 h-11 p-0 border-none bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-[12px] shrink-0"
        >
          <img
            src="/icons/settings.svg"
            alt=""
            width={20}
            height={20}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[280px] p-0 bg-white rounded-[8px] shadow-lg border border-[#E2E8F0]"
        align="end"
        sideOffset={8}
      >
        <div
          className="p-4 border-b border-[#E2E8F0] cursor-pointer"
          onClick={() => handleToggleAll()}
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectAllChecked}
              className="w-4 h-4 rounded-[4px] border-2 data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6] data-[state=unchecked]:bg-white data-[state=unchecked]:border-[#CBD5E1] pointer-events-none"
            />
            <h3 className="text-[14px] leading-[20px] font-semibold text-[#0F172A]">
              {label}
            </h3>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {columns.map((column) => {
            const isVisible = visibleColumns.has(column.key);
            const title = getColumnLabel
              ? getColumnLabel(column)
              : typeof column.title === "string"
                ? column.title
                : String(column.key);

            return (
              <div
                key={column.key}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                onClick={() => handleToggleColumn(column.key)}
              >
                <Checkbox
                  checked={isVisible}
                  className="w-4 h-4 rounded-[4px] border-2 data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6] data-[state=unchecked]:bg-white data-[state=unchecked]:border-[#CBD5E1] pointer-events-none"
                />
                <span
                  className={`text-[14px] leading-[20px] font-medium flex-1 ${
                    !isVisible ? "text-[#94A3B8]" : "text-[#1E293B]"
                  }`}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
