"use client";

import { useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger, Calendar } from "@shared/ui";
import { cn } from "@shared/lib/utils";

const DEFAULT_WIDTH = 160;
const CALENDAR_ICON_CLASS =
  "absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] pointer-events-none";
const TRIGGER_BASE_CLASS =
  "h-11 rounded-[12px] border border-[#E2E8F0] bg-white px-3 pr-10 text-sm text-[#000000] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] cursor-pointer text-left";

function toDate(value: string): Date | undefined {
  if (!value?.trim()) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(value: string): string {
  const d = toDate(value);
  if (!d) return "";
  return d.toLocaleDateString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** Width in px. Default 160. Use "full" for w-full. */
  width?: number | "full";
  /** Show calendar icon. Default true. */
  showIcon?: boolean;
}

export function DateInput({
  value,
  onChange,
  placeholder = "mm/dd/yyyy",
  className,
  width = DEFAULT_WIDTH,
  showIcon = true,
}: DateInputProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = toDate(value);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      onChange(toIsoDate(date));
      setOpen(false);
    },
    [onChange]
  );

  const displayValue = formatDisplay(value);
  const widthStyle =
    width === "full"
      ? { width: "100%" }
      : { minWidth: width, maxWidth: width };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            TRIGGER_BASE_CLASS,
            "relative shrink-0",
            width === "full" && "w-full",
            !displayValue && "text-[#94A3B8]",
            className
          )}
          style={widthStyle}
        >
          {displayValue || placeholder}
          {showIcon && (
            <img
              src="/icons/calendar.svg"
              alt=""
              width={20}
              height={20}
              className={CALENDAR_ICON_CLASS}
              aria-hidden
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border border-[#E2E8F0] rounded-[12px] shadow-lg z-[100]"
        align="start"
        sideOffset={4}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("[data-slot='select-content']")) {
            e.preventDefault();
          }
        }}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={1900}
          toYear={2100}
        />
      </PopoverContent>
    </Popover>
  );
}
