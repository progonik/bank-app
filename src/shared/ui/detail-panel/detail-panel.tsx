"use client";

import { cn } from "@shared/lib/utils";

/** Right-panel container: max-w 468px, flex column, gap 8 (32px) */
const DETAIL_PANEL_CLASS = "flex flex-col gap-8 max-w-[468px]";

export interface DetailPanelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DetailPanel({ children, className }: DetailPanelProps) {
  return <div className={cn(DETAIL_PANEL_CLASS, className)}>{children}</div>;
}
