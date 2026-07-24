"use client";

import { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@shared/ui";
import { cn } from "@shared/lib/utils";
import type { DataTableColumn, DataTableProps } from "./types";
import {
  DEFAULT_PAGE_SIZES,
  INDEX_COLUMN_WIDTH,
  ACTIONS_COLUMN_WIDTH,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_MIN_WIDTH,
  FIXED_COLUMN_SHADOW,
} from "./constants";
import { DataTablePagination } from "./data-table-pagination";

function getColumnWidth<T>(col: DataTableColumn<T>): number {
  if (col.width != null) return col.width;
  if (col.minWidth != null) return typeof col.minWidth === "number" ? col.minWidth : DEFAULT_COLUMN_WIDTH;
  return DEFAULT_COLUMN_WIDTH;
}

function isFixedLeft(fixed?: string): boolean {
  return fixed === "left" || fixed === "start";
}

function isFixedRight(fixed?: string): boolean {
  return fixed === "right" || fixed === "end";
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  showIndex = true,
  renderActions,
  page = 1,
  pageSize = 25,
  total = 0,
  onPageChange,
  onLimitChange,
  pageSizes = DEFAULT_PAGE_SIZES,
  noPagination = false,
  isInfinite = false,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  loadMoreLabel = "Load more",
  loadingMoreLabel = "Loading...",
  minWidth = DEFAULT_MIN_WIDTH,
  scrollHeight,
  className,
  resultsLabel = "Results",
  ofLabel = "of",
  previousLabel = "Previous",
  nextLabel = "Next",
}: DataTableProps<T>) {
  const totalCount = total > 0 ? total : data.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const { leftColumns, middleColumns, rightColumns, leftOffsets, rightOffsets } =
    useMemo(() => {
      const left: DataTableColumn<T>[] = [];
      const middle: DataTableColumn<T>[] = [];
      const right: DataTableColumn<T>[] = [];
      columns.forEach((col) => {
        if (isFixedLeft(col.fixed)) left.push(col);
        else if (isFixedRight(col.fixed)) right.push(col);
        else middle.push(col);
      });
      const leftOffsets: number[] = [];
      let offset = showIndex ? INDEX_COLUMN_WIDTH : 0;
      left.forEach((col) => {
        leftOffsets.push(offset);
        offset += getColumnWidth(col);
      });
      const rightOffsets: number[] = [];
      offset = renderActions ? ACTIONS_COLUMN_WIDTH : 0;
      for (let i = right.length - 1; i >= 0; i--) {
        rightOffsets[i] = offset;
        offset += getColumnWidth(right[i]);
      }
      return {
        leftColumns: left,
        middleColumns: middle,
        rightColumns: right,
        leftOffsets,
        rightOffsets,
      };
    }, [columns, showIndex, renderActions]);

  return (
    <div
      className={cn(
        "rounded-[12px] border border-[#E2E8F0] overflow-hidden flex flex-col relative bg-white",
        className
      )}
    >
      <div
        className={cn(
          "overflow-y-auto overflow-x-auto w-full data-table-scroll min-h-0",
          scrollHeight != null ? "shrink-0" : "flex-1"
        )}
        style={{
          scrollbarGutter: "stable",
          ...(scrollHeight != null && { maxHeight: scrollHeight }),
          ...(scrollHeight != null && { minHeight: scrollHeight }),
        }}
      >
        <div
          className={cn(
            "relative w-full min-w-max [&_[data-slot=table-container]]:overflow-visible"
          )}
          style={{ minWidth }}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              <TableRow className="border-[#E2E8F0] hover:bg-white">
                {showIndex && (
                  <TableHead
                    className="p-[18px] max-w-[56px] w-[56px] head-text sticky left-0 bg-white border-b border-[#E2E8F0] z-10"
                    style={{
                      minWidth: INDEX_COLUMN_WIDTH,
                      maxWidth: INDEX_COLUMN_WIDTH,
                      boxShadow: `1px 0 0 0 ${FIXED_COLUMN_SHADOW}`,
                    }}
                  >
                    №
                  </TableHead>
                )}
                {leftColumns.map((col, idx) => {
                  const w = getColumnWidth(col);
                  const isLast = idx === leftColumns.length - 1 && (middleColumns.length > 0 || rightColumns.length > 0);
                  return (
                    <TableHead
                      key={col.key}
                      className={cn(
                        "p-[18px] head-text bg-white border-b border-[#E2E8F0] sticky left-0 z-10",
                        col.className
                      )}
                      style={{
                        minWidth: w,
                        maxWidth: w,
                        width: w,
                        left: leftOffsets[idx],
                        boxShadow: isLast ? `1px 0 0 0 ${FIXED_COLUMN_SHADOW}` : undefined,
                      }}
                    >
                      {col.title}
                    </TableHead>
                  );
                })}
                {middleColumns.map((col) => {
                  const w = getColumnWidth(col);
                  return (
                    <TableHead
                      key={col.key}
                      className={cn(
                        "p-[18px] head-text bg-white border-b border-[#E2E8F0]",
                        col.className
                      )}
                      style={{
                        minWidth: col.width ?? col.minWidth ?? w,
                        ...(col.width && { maxWidth: col.width, width: col.width }),
                      }}
                    >
                      {col.title}
                    </TableHead>
                  );
                })}
                {rightColumns.map((col, idx) => {
                  const w = getColumnWidth(col);
                  const isFirst = idx === 0 && (middleColumns.length > 0 || leftColumns.length > 0 || showIndex);
                  return (
                    <TableHead
                      key={col.key}
                      className={cn(
                        "p-[18px] head-text bg-white border-b border-[#E2E8F0] sticky right-0 z-10",
                        col.className
                      )}
                      style={{
                        minWidth: w,
                        maxWidth: w,
                        width: w,
                        right: rightOffsets[idx],
                        boxShadow: isFirst ? `-1px 0 0 0 ${FIXED_COLUMN_SHADOW}` : undefined,
                      }}
                    >
                      {col.title}
                    </TableHead>
                  );
                })}
                {renderActions && (
                  <TableHead
                    className="p-[18px] w-[50px] min-w-[50px] max-w-[50px] sticky right-0 bg-white border-b border-[#E2E8F0] z-10"
                    style={{
                      boxShadow: `-1px 0 0 0 ${FIXED_COLUMN_SHADOW}`,
                    }}
                  />
                )}
              </TableRow>
            </TableHeader>
            <TableBody className={cn(scrollHeight != null ? "min-h-0" : "flex-1")}>
              {data.map((item, rowIndex) => {
                const rowNum = (currentPage - 1) * pageSize + rowIndex + 1;
                return (
                  <TableRow
                    key={getRowKey(item)}
                    className="border-b! border-[#E2E8F0]! hover:bg-slate-50 bg-white w-full"
                  >
                    {showIndex && (
                      <TableCell
                        className="px-[16px] py-[22px] max-w-[56px] w-[56px] id-text sticky left-0 bg-white border-b border-[#E2E8F0]"
                        style={{
                          minWidth: INDEX_COLUMN_WIDTH,
                          maxWidth: INDEX_COLUMN_WIDTH,
                          width: INDEX_COLUMN_WIDTH,
                          zIndex: 5,
                          boxShadow: `1px 0 0 0 ${FIXED_COLUMN_SHADOW}`,
                          backgroundColor: "white",
                        }}
                      >
                        {rowNum}
                      </TableCell>
                    )}
                    {leftColumns.map((col, idx) => {
                      const w = getColumnWidth(col);
                      const isLast = idx === leftColumns.length - 1 && (middleColumns.length > 0 || rightColumns.length > 0);
                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            "px-[16px] py-[22px] item-text sticky left-0 bg-white border-b border-[#E2E8F0]",
                            col.className
                          )}
                          style={{
                            minWidth: w,
                            maxWidth: w,
                            width: w,
                            left: leftOffsets[idx],
                            zIndex: 5,
                            boxShadow: isLast ? `1px 0 0 0 ${FIXED_COLUMN_SHADOW}` : undefined,
                            backgroundColor: "white",
                          }}
                        >
                          {col.render
                            ? col.render(item)
                            : String((item as Record<string, unknown>)[col.key] ?? "")}
                        </TableCell>
                      );
                    })}
                    {middleColumns.map((col) => {
                      const w = getColumnWidth(col);
                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            "px-[16px] py-[22px] item-text",
                            col.className
                          )}
                          style={{
                            minWidth: col.width ?? col.minWidth ?? w,
                            ...(col.width && { maxWidth: col.width, width: col.width }),
                          }}
                        >
                          {col.render
                            ? col.render(item)
                            : String((item as Record<string, unknown>)[col.key] ?? "")}
                        </TableCell>
                      );
                    })}
                    {rightColumns.map((col, idx) => {
                      const w = getColumnWidth(col);
                      const isFirst = idx === 0 && (middleColumns.length > 0 || leftColumns.length > 0 || showIndex);
                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            "px-[16px] py-[22px] item-text sticky right-0 bg-white",
                            col.className
                          )}
                          style={{
                            minWidth: w,
                            maxWidth: w,
                            width: w,
                            right: rightOffsets[idx],
                            zIndex: 5,
                            boxShadow: isFirst ? `-1px 0 0 0 ${FIXED_COLUMN_SHADOW}` : undefined,
                            backgroundColor: "white",
                          }}
                        >
                          {col.render
                            ? col.render(item)
                            : String((item as Record<string, unknown>)[col.key] ?? "")}
                        </TableCell>
                      );
                    })}
                    {renderActions && (
                      <TableCell
                        className="px-[16px] py-[22px] sticky right-0 bg-white"
                        style={{
                          zIndex: 5,
                          boxShadow: `-1px 0 0 0 ${FIXED_COLUMN_SHADOW}`,
                          backgroundColor: "white",
                        }}
                      >
                        {renderActions(item, rowIndex)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {!noPagination && (onLimitChange || onPageChange || isInfinite) && (
        <div className="border-t border-[#E2E8F0] px-4 pt-5 flex items-center justify-between bg-white shrink-0">
          {isInfinite ? (
            <>
              <p className="text-[14px] leading-[20px] font-semibold text-[#475569]">
                {resultsLabel}: {totalCount}
              </p>
              {hasMore && onLoadMore && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : loadMoreLabel}
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="flex gap-[32px] items-center">
                {onLimitChange && (
                  <Select
                    value={String(pageSize)}
                    onValueChange={(v) => onLimitChange(Number(v))}
                  >
                    <SelectTrigger className="w-[80px] h-9 w-[118px] h-[48px] min-h-[48px] px-5 py-3 gap-[10px] rounded-md border">
                      {pageSize}
                    </SelectTrigger>
                    <SelectContent>
                      {pageSizes.map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {onPageChange && totalCount > 0 && (
                  <DataTablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    previousLabel={previousLabel}
                    nextLabel={nextLabel}
                  />
                )}
              </div>

              <p className="text-[14px] leading-[20px] font-semibold text-[#475569]">
                {resultsLabel}: {totalCount > 0 ? `${startItem}-${endItem}` : "0"} {ofLabel} {totalCount}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
