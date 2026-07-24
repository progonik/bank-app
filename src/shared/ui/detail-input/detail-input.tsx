"use client";

import { Input } from "@shared/ui";
import { cn } from "@shared/lib/utils";

/** Label: Inter 600, 14px, 20px line-height, -0.6% letter-spacing, #000 */
const LABEL_CLASS =
  "font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#000000]";

/** Input box: 44px height, 12px radius, 1px #E2E8F0, 12px padding, Inter 500 14px */
const INPUT_BASE =
  "h-11 rounded-[12px] border border-[#E2E8F0] bg-[#FFFFFF] px-3 font-medium text-[14px] leading-5 text-[#000000]";

const WIDTH_CLASSES = {
  compact: "w-[194px]",
  default: "w-full min-w-0",
  full: "w-full",
} as const;

export type DetailInputWidth = keyof typeof WIDTH_CLASSES;

export interface DetailInputProps {
  readonly label: string;
  readonly value: string;
  readonly onChange?: (value: string) => void;
  readonly placeholder?: string;
  readonly readOnly?: boolean;
  /** Width variant: compact=194px, default=flex fill, full=100% */
  readonly width?: DetailInputWidth;
  readonly className?: string;
}

export function DetailInput({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  width = "compact",
  className,
}: DetailInputProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className={LABEL_CLASS}>{label}</span>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        // disabled={readOnly}
        className={cn(INPUT_BASE, WIDTH_CLASSES[width])}
      />
    </div>
  );
}
