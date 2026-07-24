"use client";

import type { ReactNode } from "react";
import { cn } from "@shared/lib/utils";

const ROW_CLASS = "flex items-center gap-4";
const LABEL_CLASS =
  "text-sm font-medium text-[#334155] shrink-0 w-[180px]";

export interface FormRowProps {
  label: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}

export function FormRow({
  label,
  children,
  className,
  labelClassName,
}: FormRowProps) {
  return (
    <div className={cn(ROW_CLASS, className)}>
      <label className={cn(LABEL_CLASS, labelClassName)}>{label}</label>
      {children}
    </div>
  );
}
