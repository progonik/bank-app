"use client";

import { TranslateFn } from "@/src/pages/workers/model/create-workers-columns";
import { cn } from "@shared/lib/utils";
import Link from "next/link";

export interface TabItem<T extends string = string> {
  readonly id: T;
  readonly label: string;
}

export interface TabsProps<T extends string = string> {
  readonly t: TranslateFn;
  readonly titleLinkLabel?: string;
  readonly tabs: readonly TabItem<T>[];
  readonly value: T;
  readonly onValueChange: (value: T) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly contentClassName?: string;
  readonly titleLink?: string;
}

/** Outlined tab per design: 200×44px, py-3 px-4 (12px 16px), 2px border */
const TAB_BASE =
  "w-[200px] h-11 flex items-center justify-center font-bold text-[14px] leading-5 tracking-[-0.006em] rounded-lg border-2 px-4 py-3 transition-colors";

export function Tabs<T extends string = string>({
  tabs,
  value,
  onValueChange,
  children,
  className,
  contentClassName,
  t,
  titleLink,
  titleLinkLabel,
}: TabsProps<T>) {
  return (
    <div className={cn("flex flex-col flex-1 min-w-0", className)}>
      <div className="flex gap-2 items-center shrink-0 mb-4">
        <Link
          href={titleLink || "/"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF] text-[#000000] transition-colors p-[9px]"
          aria-label={titleLinkLabel}
        >
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.22495 0.825012L0.824951 5.22501M0.824951 5.22501L5.22495 9.62501M0.824951 5.22501L14.025 5.22501" stroke="black" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Link>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onValueChange(tab.id)}
            className={cn(
              TAB_BASE,
              value === tab.id
                ? "border-[#3761E9] bg-[#FFFFFF] text-[#3761E9] border-[2px]"
                : "border-transparent bg-[#FFFFFF] text-[#475569] hover:border-[#CBD5E1] hover:text-[#334155] border-[2px]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={cn("pt-6", contentClassName)}>{children}</div>
    </div>
  );
}
