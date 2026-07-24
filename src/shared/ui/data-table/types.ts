import type { ReactNode } from "react";

export type ColumnFixed = "left" | "right" | "start" | "end";

export interface DataTableColumn<T> {
  key: string;
  title: ReactNode;
  render?: (item: T) => ReactNode;
  width?: number;
  minWidth?: number;
  className?: string;
  /** Fix column on left or right when scrolling horizontally. start = left, end = right */
  fixed?: ColumnFixed;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => string | number;
  showIndex?: boolean;
  renderActions?: (item: T, rowIndex: number) => ReactNode;
  /** Pagination (used when isInfinite is false) */
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizes?: number[];
  noPagination?: boolean;
  /** Infinite scroll mode. When true, pagination is replaced with Load more. */
  isInfinite?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loadMoreLabel?: string;
  loadingMoreLabel?: string;
  /** Layout */
  minWidth?: string;
  /** Fixed height (px) for scrollable table body. E.g. 280 for ~5 visible rows. */
  scrollHeight?: number;
  className?: string;
  /** i18n */
  resultsLabel?: string;
  ofLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}
