"use client";

import { cn } from "@shared/lib/utils";

/** Primary: blue text #1D4ED8, light blue bg/border. Secondary: gray #334155 */
const VARIANTS = {
  primary:
    "border border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]",
  secondary:
    "border border-[#E2E8F0] bg-[#F8FAFC] text-[#334155]",
} as const;

export type RoleTagVariant = keyof typeof VARIANTS;

export interface RoleTagProps {
  readonly label: string;
  readonly variant?: RoleTagVariant;
  readonly className?: string;
}

/** Tag: Inter 500, 14px, 20px line-height, -0.6%, pill shape */
const TEXT_CLASS =
  "font-medium text-[14px] leading-5 tracking-[-0.006em]";

export function RoleTag({
  label,
  variant = "secondary",
  className,
}: RoleTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5",
        TEXT_CLASS,
        VARIANTS[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
