"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@shared/ui";
import { ICON_BUTTON_CLASS, CONFIRM_BUTTON_CLASS } from "./constants";
import { FILTER_BAR_GAP_PX } from "../../model/constants";

interface FilterToolbarActionsProps {
  onRefresh?: () => void;
  onConfirm?: () => void;
  confirmLabel: string;
  refreshAriaLabel: string;
  rightSideActions?: ReactNode;
}

export function FilterToolbarActions({
  onRefresh,
  onConfirm,
  confirmLabel,
  refreshAriaLabel,
  rightSideActions,
}: FilterToolbarActionsProps) {
  return (
    <div
      className="flex items-center ml-auto shrink-0"
      style={{ gap: FILTER_BAR_GAP_PX }}
    >
      {onRefresh && (
        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          className={`${ICON_BUTTON_CLASS} border-none`}
          aria-label={refreshAriaLabel}
        >
          <Image
            src="/icons/reset.svg"
            alt=""
            width={20}
            height={20}
            className="rotate-180"
          />
        </Button>
      )}
      {onConfirm && (
        <Button
          type="button"
          onClick={onConfirm}
          className={CONFIRM_BUTTON_CLASS}
        >
          <Image
            src="/icons/checked.png"
            alt=""
            width={16}
            height={16}
            className=""
          />
          {confirmLabel}
        </Button>
      )}
      {rightSideActions}
    </div>
  );
}
