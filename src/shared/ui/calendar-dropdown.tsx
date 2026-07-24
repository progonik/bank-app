"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@shared/lib/utils";

interface DropdownOption {
  value: number;
  label: string;
  disabled: boolean;
}

interface CalendarDropdownProps {
  options?: DropdownOption[];
  value?: number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  className?: string;
  /** @deprecated - not used, kept for DropdownProps compatibility */
  components?: unknown;
  /** @deprecated - not used, kept for DropdownProps compatibility */
  classNames?: unknown;
}

export function CalendarDropdown({
  options = [],
  value,
  onChange,
  disabled,
  className,
}: CalendarDropdownProps) {
  const valueStr = value !== undefined && value !== null ? String(value) : "";

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      onChange?.({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLSelectElement>);
    },
    [onChange]
  );

  const selectedOption = options.find((o) => o.value === value);

  return (
    <Select
      value={valueStr || undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "h-8 min-w-16 border-[#E2E8F0] bg-white text-sm",
          className
        )}
      >
        <SelectValue placeholder={selectedOption?.label ?? ""} />
      </SelectTrigger>
      <SelectContent className="z-[100] max-h-[200px]!">
        {options.map(({ value: optValue, label, disabled: optDisabled }) => (
          <SelectItem
            key={optValue}
            value={String(optValue)}
            disabled={optDisabled}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
