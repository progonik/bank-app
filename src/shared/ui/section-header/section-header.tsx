"use client";

import { cn } from "@shared/lib/utils";

/** Section header: Inter 600, 20px, 28px line-height, -1% letter-spacing, #000 */
const SECTION_HEADER_CLASS =
  "font-semibold text-[20px] leading-[28px] tracking-[-0.01em] text-[#000000]";

export interface SectionHeaderProps {
  readonly title: string;
  readonly className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return <h3 className={cn(SECTION_HEADER_CLASS, className)}>{title}</h3>;
}
