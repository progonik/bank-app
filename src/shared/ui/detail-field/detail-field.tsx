"use client";

import { cn } from "@shared/lib/utils";

/** Label: Inter 600, 14px, 20px line-height, -0.6% letter-spacing, #000 */
const LABEL_CLASS =
  "font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#000000]";
/** Value box: 12px radius, 1px #E2E8F0, 12px padding, 44px height */
const VALUE_BOX_BASE =
  "flex items-center h-[44px] rounded-[12px] border border-[#E2E8F0] bg-[#FFFFFF] px-3";
/** Value text: Inter 500, 14px, 160% line-height (22.4px), #000 */
const VALUE_TEXT_CLASS =
  "font-medium text-[14px] leading-[22.4px] text-[#000000]";

export interface DetailFieldProps {
  readonly label: string;
  readonly value: React.ReactNode;
  /** Override value text color (e.g. #16A34A job status, #2563EB salary/active) */
  readonly valueColor?: string;
  /** When true, field width 404px; otherwise 380px */
  readonly fullWidth?: boolean;
  readonly className?: string;
}

export function DetailField({
  label,
  value,
  valueColor,
  fullWidth = false,
  className,
}: DetailFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className={LABEL_CLASS}>{label}</span>
      <div
        className={cn(
          VALUE_BOX_BASE,
          fullWidth ? "w-[404px]" : "w-[380px]"
        )}
        style={valueColor ? { color: valueColor } : undefined}
      >
        <span className={cn(VALUE_TEXT_CLASS, "flex-1")}>{value}</span>
      </div>
    </div>
  );
}
