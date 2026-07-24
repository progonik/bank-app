const VISIBLE_PAGE_BUTTONS = 5;

export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  if (totalPages <= VISIBLE_PAGE_BUTTONS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (currentPage >= totalPages - 2) {
    return Array.from(
      { length: VISIBLE_PAGE_BUTTONS },
      (_, i) => totalPages - 4 + i
    );
  }
  return Array.from(
    { length: VISIBLE_PAGE_BUTTONS },
    (_, i) => currentPage - 2 + i
  );
}
