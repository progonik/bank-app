"use client";

import { cn } from "@shared/lib/utils";

/** Tag: Gray/5 #F8FAFC, 8px radius, 12px padding, 12px gap, 44px min-height, Inter 500 14px */
const TAG_CLASS =
  "inline-flex items-center gap-3 min-h-[44px] rounded-[8px] bg-[#F8FAFC] px-3 py-3 font-medium text-[14px] leading-5 text-[#000000]";

export interface TagChipProps {
  readonly label: string;
  readonly onRemove?: () => void;
  readonly className?: string;
}

export function TagChip({ label, onRemove, className }: TagChipProps) {
  return (
    <span className={cn(TAG_CLASS, className)}>
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="-m-1 ml-0 p-1 rounded hover:bg-[#E2E8F0] transition-colors shrink-0"
          aria-label={`Remove ${label}`}
        >
          <img
            src="/icons/x.svg"
            alt=""
            width={14}
            height={14}
            className="opacity-70"
          />
        </button>
      )}
    </span>
  );
}
