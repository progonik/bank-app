import type { ReactNode } from "react";

export interface TableHeaderProps {
  readonly title: string;
  readonly breadcrumb?: TableHeaderBreadcrumb;
  readonly toolbar?: ReactNode;
  readonly action?: TableHeaderAction;
  readonly className?: string;
}

export interface TableHeaderBreadcrumb {
  readonly label: string;
  readonly href: string;
}

export interface TableHeaderAction {
  readonly label: string;
  readonly dialogContent: ReactNode;
  readonly dialogClassName?: string;
  readonly disabled?: boolean;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

