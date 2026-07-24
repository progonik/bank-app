"use client";

import { cn } from "@shared/lib/utils";
import { getVisiblePageNumbers } from "./utils";

const PAGINATION_GAP = 10;
const PAGE_BUTTON_SIZE = 40;
const BRAND_5 = "#EFF6FF";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel: string;
  nextLabel: string;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel,
  nextLabel,
}: DataTablePaginationProps) {
  const visiblePages = getVisiblePageNumbers(currentPage, totalPages);
  const hasEllipsis = totalPages > 5;

  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  const btnBase =
    "inline-flex items-center justify-center pagination-page transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div
      className="flex items-center"
      style={{ gap: PAGINATION_GAP }}
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={cn(
          btnBase,
          "gap-1.5 text-[#475569] hover:text-[#334155]"
        )}
        aria-label={previousLabel}
      >
        <img
          src="/icons/prev.svg"
          alt=""
          width={20}
          height={20}
          className="shrink-0"
          aria-hidden
        />
        <span className="pagination-label">{previousLabel}</span>
      </button>

      <div
        className="flex items-center shrink-0"
        style={{ gap: PAGINATION_GAP }}
      >
        <div
          className="grid grid-flow-col items-center shrink-0"
          style={{
            gridTemplateColumns: `repeat(${visiblePages.length}, ${PAGE_BUTTON_SIZE}px)`,
            gap: PAGINATION_GAP,
          }}
        >
          {visiblePages.map((pageNum, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "pagination-page rounded-full transition-colors flex items-center justify-center col-span-1",
                pageNum === currentPage
                  ? "text-[#2563EB]"
                  : "text-[#475569] hover:text-[#334155]"
              )}
              style={{
                width: PAGE_BUTTON_SIZE,
                height: PAGE_BUTTON_SIZE,
                minWidth: PAGE_BUTTON_SIZE,
                backgroundColor: pageNum === currentPage ? BRAND_5 : "transparent",
              }}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>
        {hasEllipsis && (
          <>
            <span
              className="pagination-page flex items-center justify-center text-[#475569] shrink-0"
              style={{ width: PAGE_BUTTON_SIZE, height: PAGE_BUTTON_SIZE }}
            >
              ...
            </span>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={cn(
                "pagination-page shrink-0 rounded-full transition-colors flex items-center justify-center",
                currentPage === totalPages
                  ? "text-[#2563EB]"
                  : "text-[#475569] hover:text-[#334155]"
              )}
              style={{
                width: PAGE_BUTTON_SIZE,
                height: PAGE_BUTTON_SIZE,
                backgroundColor:
                  currentPage === totalPages ? BRAND_5 : "transparent",
              }}
              aria-current={currentPage === totalPages ? "page" : undefined}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={cn(
          btnBase,
          "gap-1.5 text-[#475569] hover:text-[#334155]"
        )}
        aria-label={nextLabel}
      >
        <span className="pagination-label">{nextLabel}</span>
        <img
          src="/icons/next.svg"
          alt=""
          width={20}
          height={20}
          className="shrink-0"
          aria-hidden
        />
      </button>
    </div>
  );
}
